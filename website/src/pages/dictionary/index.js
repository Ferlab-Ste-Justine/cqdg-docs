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

import React, { useState, createRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import startCase from 'lodash/startCase';
import merge from 'lodash/merge';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ThemeProvider } from 'emotion-theming'

import { saveAs } from 'file-saver';
import defaultTheme from '@icgc-argo/uikit/theme/defaultTheme';
import Typography from '@icgc-argo/uikit/Typography';
import Modal from '@icgc-argo/uikit/Modal';

import StyleWrapper from '../../components/StyleWrapper';
import FileFilters, { 
  NO_ACTIVE_FILTER,  
  generateFilter,
  generateComparisonFilter,
  createFilters,
  attributeFilter,
  tierFilter,
  comparisonFilter,
  defaultSearchParams, 
  DEFAULT_FILTER  
} from '../../components/FileFilters';
import SchemaMenu from '../../components/ContentMenu';
import { Display, DownloadButtonContent } from '../../components/common';
import { getLatestVersion } from '../../utils';
import Meta from '../../components/Meta';
import { Button, ResetButton } from '../../components/Button';
import Dictionary from '../../components/Dictionary';
import CompareLegend, { generateComparisonCounts } from '../../components/CompareLegend';
import {ChangeType} from '../../types';
import VersionSelect from '../../components/VersionSelect';
import { getDictionary, getDictionaryDiff, createSchemasWithDiffs } from '../../helpers/schema';
import Close from '../../components/Icons/Close';

import styles from './styles.module.css';
import theme from '../../theme/theme';

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
const preloadedData = {data: data.dictionary, version: data.currentVersion};

const DataDictionary = () => {
  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { PLATFORM_UI_ROOT = '', GATEWAY_API_ROOT = '' },
    },
  } = context;
  const [searchParams, setSearchParams] = useState(defaultSearchParams);

  const versions = data.versions;
  const [version, setVersion] = useState(data.currentVersion);
  const [activeSchemas, setActiveSchemas] = useState(preloadedData.data.schemas);

  const [diffVersion, setDiffVersion] = useState(versions[1]);
  const [isDiffShowing, setIsDiffShowing] = useState(false);

  const TAB_STATE = Object.freeze({
    OVERVIEW: 'OVERVIEW',
    DETAILS: 'DETAILS',
  });
  const [selectedTab] = React.useState(TAB_STATE.DETAILS);
  
  const isLatestSchema = getLatestVersion() === version ? true : false;

  useEffect(() => {
    const resolveSchemas = async () => {
      try {
        const dict = await getDictionary(version);
        const diff = await getDictionaryDiff(version, diffVersion);
        const schemas = diff && isDiffShowing ? createSchemasWithDiffs(dict.schemas, diff.schemas) : dict.schemas;

        setActiveSchemas(schemas);
      } catch (e) {
        console.error('Cannot resolve schemas', e);
        setActiveSchemas([]);
      }
    }
    resolveSchemas();
  }, [version, diffVersion, isDiffShowing]);


  const downloadTsvFileTemplate = (fileName) => {
    const zip = require('jszip')();

    activeSchemas.forEach(schema => {
      const template = createTsvTemplate(schema);
      zip.file(`${schema.name}_v${version}.tsv`, template);
    });

    zip.generateAsync({type:"blob"})
      .then(function(content) {
        saveAs(content, "file-templates.zip");
      });
  }
  const createTsvTemplate = (schema) => {
    const header =
      schema.fields
        .map((f) => {
          return f.name;
        })
        .join('\t') + '\n';
    return header;
  }

  // filter schemas
  const filteredSchemas = React.useMemo(
    () =>
      //  filter DELETED schemas out if not showing diff
      activeSchemas
        .filter((schema) => (isDiffShowing ? Boolean : schema.changeType !== ChangeType.DELETED))
        .map((schema) => ({
          ...schema,
          fields: schema.fields.filter((field) =>
            isDiffShowing ? Boolean : field.changeType !== ChangeType.DELETED,
          ),
        }))
        // filter schemas based on active/search
        .map((schema) => {
          const { tier, attribute, comparison } = searchParams;
          const filteredFields = schema.fields
            .filter(tierFilter(tier))
            .filter(attributeFilter(attribute))
            .filter(comparisonFilter(comparison));

          return {
            ...schema,
            fields: filteredFields,
          };
        })
        .filter((schema) => schema.fields.length > 0),
    [activeSchemas, isDiffShowing, searchParams],
  );

  const comparisonCounts = generateComparisonCounts(filteredSchemas);
  const fileCount = filteredSchemas.length;
  const fieldCount = filteredSchemas.reduce((acc, schema) => acc + schema.fields.length, 0);

  const filters = React.useMemo(() => createFilters(activeSchemas), [activeSchemas]);

  const generateMenuContents = (activeSchemas) => {
    const activeSchemaNames = activeSchemas.map((s) => s.name);
    return activeSchemas.map((schema) => ({
      key: schema.name,
      name: startCase(schema.name),
      contentRef: createRef(),
      active: false,
      disabled: !activeSchemaNames.includes(schema.name),
    }));
  };

  const menuContents = generateMenuContents(filteredSchemas);
  const mergedTheme = merge(defaultTheme, theme);

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
                  <VersionSelect value={version} versions={versions} onChange={(e) => setVersion(e.value)} />
                  <Button
                    className={styles.compareButton}
                    onClick={() => setIsDiffShowing(true)}
                  >
                    Compare ...
                  </Button>
                  {isDiffShowing && (
                    <div className={styles.compareSection}>
                      <VersionSelect
                        value={diffVersion}
                        versions={versions.filter((v) => v !== version)}
                        onChange={(data) => setDiffVersion(data.value)}
                      />
                      <CompareLegend
                        comparison={comparisonCounts}
                      />
                      <Button
                        className={styles.clear}
                        type="secondary"
                        onClick={() => {
                          setIsDiffShowing(false);
                          setSearchParams({ ...searchParams, comparison: DEFAULT_FILTER.value });
                        }}
                      >
                        <Close className={styles.closeIcon} />
                        CLEAR
                      </Button>
                    </div>
                  )}
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
                    className={styles.searchContainer}
                  >
                    <FileFilters
                      tiers={filters.tiers.map(generateFilter)}
                      attributes={filters.attributes.map(generateFilter)}
                      comparisons={
                        version === diffVersion
                          ? []
                          : filters.comparison.map(generateComparisonFilter)
                      }
                      searchParams={searchParams}
                      onSearch={(search) => setSearchParams(search)}
                      isDiffShowing={isDiffShowing}
                    />
                    <ResetButton
                      disabled={
                        searchParams.tier === NO_ACTIVE_FILTER &&
                        searchParams.attribute === NO_ACTIVE_FILTER &&
                        searchParams.comparison === NO_ACTIVE_FILTER
                      }                      
                      onClick={() => setSearchParams(defaultSearchParams)}
                    >
                      Reset
                    </ResetButton>
                  </div>
                </div>
              </Display>

              <Display visible={selectedTab === TAB_STATE.DETAILS}>
                <div
                  className={styles.dictionary}
                >
                  <Dictionary
                    schemas={filteredSchemas}
                    menuContents={menuContents}
                    isLatestSchema={isLatestSchema}
                    isDiffShowing={isDiffShowing}
                  />
                </div>
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
