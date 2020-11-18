/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 */

import React, { useState, createRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import startCase from 'lodash/startCase';
import get from 'lodash/get';
import find from 'lodash/find';
import uniq from 'lodash/uniq';
import merge from 'lodash/merge';
import { css } from 'emotion';
import flattenDeep from 'lodash/flattenDeep';

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { ThemeProvider } from 'emotion-theming'
import defaultTheme from '@icgc-argo/uikit/theme/defaultTheme';
import Typography from '@icgc-argo/uikit/Typography';
import Modal from '@icgc-argo/uikit/Modal';

import StyleWrapper from '../../components/StyleWrapper';
import Schema from '../../components/Schema';
import FileFilters, { NO_ACTIVE_FILTER, DEFAULT_FILTER } from '../../components/FileFilters';
import TreeView from '../../components/TreeView';
import { TAG_TYPES } from '../../components/Tag';
import SchemaMenu from '../../components/ContentMenu';
import { Display, DownloadButtonContent } from '../../components/common';
import { getLatestVersion } from '../../utils';
import Meta from '../../components/Meta';
import { Button, ResetButton } from '../../components/Button';
import Select from '../../components/Select';

import styles from './styles.module.css';
import theme from './theme';

import './custom.css';


export const useModalState = () => {
  const [visibility, setVisibility] = useState(false);

  const setModalVisibility = (visibility) => {
    setVisibility(visibility);
    const bodyClassList = document.getElementsByTagName('html')[0].classList;
    if (visibility) {
      bodyClassList.add('modal-open');
    } else {
      bodyClassList.remove('modal-open');
    }
  };

  return [visibility, setModalVisibility];
};

const modalPortalRef = React.createRef();
export const ModalPortal = ({ children }) => {
  const ref = modalPortalRef.current;
  return ref
    ? ReactDOM.createPortal(
        <div style={{ width: '100vw', height: '100vh' }}>
          <Modal.Overlay>{children}</Modal.Overlay>
        </div>,
        ref,
      )
    : null;
};

const data = require('./data.json');
const dictionaryTreeData = require('./tree.json');

async function fetchDictionary(version) {
  try {
    const dict = await axios.get(`/data/schemas/${version}.json`);
    const tree = await axios.get(`/data/schemas/${version}_tree.json`);
    return { dict: dict.data, tree: tree.data };
  } catch (e) {
    throw e;
  }
}

// TODO use this
async function fetchDiff(version, diffVersion) {
  const response = await axios.get(
    `/data/schemas/diffs/${version}/${version}-diff-${diffVersion}.json`,
  );
  return response.data;
}

const RenderDictionary = ({ schemas, menuContents, isLatestSchema }) =>
  schemas.length > 0 ? (
    schemas.map((schema) => {
      const menuItem = find(menuContents, { name: startCase(schema.name) });
      return <Schema schema={schema} menuItem={menuItem} isLatestSchema={isLatestSchema} />;
    })
  ) : (
    <div>No schemas found</div>
  );

function DataDictionary() {
  const [version, setVersion] = useState(data.currentVersion);
  const [dictionary, setDictionary] = useState(data.dictionary);
  const [treeData, setTreeData] = useState(dictionaryTreeData);

  const defaultSearchParams = { tier: '', attribute: '' };
  const [searchParams, setSearchParams] = useState(defaultSearchParams);
  const [searchValue, setSearchValue] = useState('');

  //
  const [diffVersion, setDiffVersion] = useState(null);

  const updateVersion = async (newVersion) => {
    const version = newVersion.value;
    try {
      const { dict, tree } = await fetchDictionary(version);
      setVersion(version);
      setDictionary(dict);
      setTreeData(tree);
    } catch (err) {
      alert('DICTIONARY FETCHING ERROR - TODO: MAKE THIS A TOASTER');
    }
  };

  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { PLATFORM_UI_ROOT = '', GATEWAY_API_ROOT = '' },
    },
  } = context;

  const downloadTsvFileTemplate = (fileName) =>
    window.location.assign(`${GATEWAY_API_ROOT}clinical/template/${fileName}`);

  const filters = React.useMemo(() => {
    const schemas = get(dictionary, 'schemas', []);

    const fields = schemas.map((schema) => schema.fields);

    const filters = flattenDeep(fields).reduce(
      (acc, field) => {
        const meta = get(field, 'meta', {});
        const { primaryId = false, core = false, dependsOn = false } = meta;
        const restrictions = get(field, 'restrictions', false);
        if (primaryId) {
          acc.tiers.push(TAG_TYPES.id);
        }

        if (!!restrictions) {
          acc.attributes.push(TAG_TYPES.required);
        }

        if (dependsOn) {
          acc.attributes.push(TAG_TYPES.conditional);
        }

        if (core) {
          acc.tiers.push(TAG_TYPES.core);
        }

        if (!core && !primaryId) {
          acc.tiers.push(TAG_TYPES.extended);
        }
        return acc;
      },
      { tiers: [], attributes: [] },
    );
    return { tiers: uniq(filters.tiers), attributes: uniq(filters.attributes) };
  }, [dictionary]);

  const filteredSchemas = React.useMemo(
    () =>
      dictionary.schemas
        .map((schema) => {
          const { tier, attribute } = searchParams;
          const filteredFields = schema.fields.filter((field) => {
            const meta = get(field, 'meta', {});
            const { primaryId = false, core = false, dependsOn = false } = meta;
            const required = get(field, 'restrictions.required', false);

            let tierBool = false;
            let attributeBool = false;

            if (tier === NO_ACTIVE_FILTER && attribute === NO_ACTIVE_FILTER) return true;

            if (
              (tier === TAG_TYPES.id && primaryId) ||
              (tier === TAG_TYPES.core && core) ||
              (tier === TAG_TYPES.extended && !core && !primaryId) ||
              tier === '' ||
              tier === NO_ACTIVE_FILTER
            ) {
              tierBool = true;
            }

            if (
              (attribute === TAG_TYPES.conditional && Boolean(dependsOn)) ||
              (attribute === TAG_TYPES.required && required) ||
              attribute === '' ||
              attribute === NO_ACTIVE_FILTER
            ) {
              attributeBool = true;
            }

            return tierBool && attributeBool;
          });
          return { ...schema, fields: filteredFields };
        })
        .filter((schema) => schema.fields.length > 0),
    [searchParams, dictionary],
  );

  const fileCount = filteredSchemas.length;
  const fieldCount = filteredSchemas.reduce((acc, schema) => acc + schema.fields.length, 0);

  const generateMenuContents = (activeSchemas) => {
    const activeSchemaNames = activeSchemas.map((s) => s.name);
    return dictionary.schemas.map((schema) => ({
      key: schema.name,
      name: startCase(schema.name),
      contentRef: createRef(),
      active: false,
      disabled: !activeSchemaNames.includes(schema.name),
    }));
  };
  const menuContents = generateMenuContents(filteredSchemas);

  const isLatestSchema = getLatestVersion() === version ? true : false;
  const TAB_STATE = Object.freeze({
    OVERVIEW: 'OVERVIEW',
    DETAILS: 'DETAILS',
  });
  const [selectedTab] = React.useState(TAB_STATE.DETAILS);

  // versions
  const versions = data.versions;
  const diffVersions = versions.filter((v) => v !== version);

  /**
   * @param {function} onChange
   * @param {string[]} versions
   * @param {string} value
   */
  const VersionSelect = ({ value, onChange, versions }) => {
    const options = versions.map((d) => ({ label: `Version ${d}`, value: d }));
    return (
      <form>
        <div style={{ width: '150px', marginRight: '10px' }}>
          <Select
            aria-label="version-select"
            onChange={(val) => onChange(val)}
            value={value}
            options={options}
          />
        </div>
      </form>
    );
  };

  const mergedTheme = merge(defaultTheme, theme);
  console.log(mergedTheme)
  return (
    <ThemeProvider theme={mergedTheme}>
      <div id="modalCont" className={styles.modalCont} ref={modalPortalRef} />

      <Layout permalink="dictionary">
        <StyleWrapper>
          <div className={styles.mainContainer}>
            <div className={styles.dict}>
              <div className={styles.heading}>
                <Typography as="h1" variant="title" color="primary" bold className={styles.mainTilte}>
                  Data Dictionary
                </Typography>
                <Typography variant="paragraph" color="primary">
                  The CQDG Data Dictionary provides information about the structure and content of the data. The metadata included in the 
                  dictionary defines the specific formats and restrictions for each data field. Data from studies participating in the 
                  CQDG must be entirely compatible with the latest version of the CQDG Data Dictionary to ensure a standard of data quality.
                  The following views describes the attributes and permissible values for all of the
                  fields within the clinical tsv files for the{' '}
                  <Link className={styles.link} to={PLATFORM_UI_ROOT}>CQDG Data Platform.</Link>
                </Typography>
              </div>
              <div className={styles.infobar}>
                <div>
                  <VersionSelect value={version} versions={versions} onChange={updateVersion} />
                  <Button
                    className={styles.compareButton}
                    onClick={() => {
                      console.log(diffVersions[0])
                      setDiffVersion(diffVersions[0]);
                    }}
                  >
                    Compare ...
                  </Button>
                  {diffVersion ? (
                    <VersionSelect
                      value={diffVersion}
                      versions={diffVersions}
                      onChange={(data) => setDiffVersion(data.value)}
                    />
                  ) : null}
                </div>
                <div className={styles.downloads}>
                  <Button
                    type="secondary"
                    onClick={() => downloadTsvFileTemplate(`all`)}
                  >
                    <DownloadButtonContent>File Templates</DownloadButtonContent>
                  </Button>
                </div>
              </div>

              <Display visible={selectedTab === TAB_STATE.DETAILS}>
                <div
                  className={styles.filter}
                >
                  <Meta files={fileCount} fields={fieldCount} />
                  <div
                    className={css`
                      display: flex;
                      flex-direction: row;
                    `}
                  >
                    <FileFilters
                      dataTiers={DEFAULT_FILTER.concat(
                        filters.tiers.map((d) => ({ label: startCase(d), value: d })),
                      )}
                      dataAttributes={DEFAULT_FILTER.concat(
                        filters.attributes.map((d) => ({
                          label: startCase(d),
                          value: d,
                        })),
                      )}
                      searchParams={searchParams}
                      onSearch={(search) => setSearchParams(search)}
                    />
                    <ResetButton
                      disabled={searchParams.tier === '' && searchParams.attribute === ''}
                      onClick={() => setSearchParams(defaultSearchParams)}
                    >
                      Reset
                    </ResetButton>
                  </div>
                </div>
              </Display>

              <Display visible={selectedTab === TAB_STATE.DETAILS}>
                <div
                  className={css`
                    margin-top: 30px;
                  `}
                >
                  <RenderDictionary
                    schemas={filteredSchemas}
                    menuContents={menuContents}
                    isLatestSchema={isLatestSchema}
                  />
                </div>
              </Display>

              <Display visible={false}>
                <TreeView searchValue={searchValue} data={treeData} />
              </Display>
            </div>

            <Display visible={selectedTab === TAB_STATE.DETAILS}>
              <div className={styles.menu}>
                <SchemaMenu
                  title="Clinical Files"
                  contents={menuContents}
                  scrollYOffset="70"
                  dataTiers={filters.tiers.map((d) => ({ content: startCase(d), value: d }))}
                  dataAttributes={filters.attributes.map((d) => ({
                    content: startCase(d),
                    value: d,
                  }))}
                />
              </div>
            </Display>
          </div>
        </StyleWrapper>
      </Layout>
    </ThemeProvider>
  );
}

export default DataDictionary;
