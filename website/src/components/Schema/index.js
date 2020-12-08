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

import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from 'emotion-theming';
import get from 'lodash/get';
import union from 'lodash/union';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import startCase from 'lodash/startCase';

import Table from '@icgc-argo/uikit/Table';
import DefaultTag from '@icgc-argo/uikit/Tag';

import { compareText } from '../CompareLegend';
import { ChangeType } from '../../types';
import Tag, { TAG_TYPES, TAG_DISPLAY_NAME } from '../Tag';
import Dot from '../Icons/Dot';
import CodeList, {Code} from './CodeList';
import Regex from './Regex';
import { DataTypography, SchemaTitle } from '../Typography';
import { ModalPortal } from '../../pages/dictionary';
import { Script } from './TableComponents';
import { DiffText, deletedStyle, createdStyle, updatedStyle } from './DiffText';
import {Button} from '../Button';
import ScriptModal from '../ScriptModal';
import CodeBlock, {CompareCodeBlock} from '../CodeBlock';

import styles from './styles.module.css';

const formatFieldType = (value) => {
  switch (value) {
    case null:
      return '';
    case 'string':
      return 'TEXT';
    default:
      return value.toUpperCase();
  }
};

const HeaderName = ({ name }) => {
  const sentenceCase = startCase(name);
  return (
    <SchemaTitle>
      {sentenceCase} ({name})
    </SchemaTitle>
  );
};

const FieldDescription = ({ name, description }) => (
  <div className={styles.fieldDescription}>
    <div className={styles.name}>{name}</div>
    <div>{description}</div>
  </div>
);

const FileExample = ({ name }) => (
  <div className={styles.fileExemple}>
    File Name Example:{' '}
    <span>{`${name}`}</span>
    [-optional-extension]
    <span>
      .tsv
    </span>
  </div>
);

const FieldsTag = ({ fieldCount }) => (
  <DefaultTag
    className={`${styles.tag} ${styles.fields}`}
    style={{ marginTop: '3px' }}
  >{`${fieldCount} Field${fieldCount > 1 ? 's' : ''}`}</DefaultTag>
);

const getTableData = (isDiffShowing, fields) =>
  isDiffShowing
    ? fields
    : fields
        .filter((field) => {
          return field.changeType !== ChangeType.DELETED;
        })
        .map((field) => ({ ...field, changeType: null, diff: null }));

const checkDiff = (diff, fields) => fields.reduce((acc, field) => acc && Boolean(get(diff, field, false)), true);

const SchemaMeta = ({ schema, fieldCount }) => {
  const { name, description, diff } = schema;
  return (
    <>
      <div className={styles.headerTable}>
        <HeaderName name={name} />
        <FieldsTag fieldCount={fieldCount} />
      </div>

      <div>
        <DataTypography>
          {diff && diff.description ? (
            <div>
              <div css={updatedStyle}>{diff.description.left}</div>
              <div css={deletedStyle}>{diff.description.right}</div>
            </div>
          ) : description ? (
            description
          ) : null}
          <FileExample name={name} />
        </DataTypography>
      </div>
    </>
  );
};

const Schema = ({ schema, menuItem, isDiffShowing }) => {
  const context = useDocusaurusContext();
  const {
    siteConfig: {
      customFields: { GATEWAY_API_ROOT = '' },
    },
  } = context;

  /**
   * need to pass in state for Cell rendering
   * react-table rerenders everything
   */
  const initialExpandingFields = useMemo(
    () =>
      schema.fields.reduce((acc, val) => {
        acc[val.name] = false;
        return acc;
      }, {}),
    [schema],
  );

  const [expandedCodeLists, setExpandedCodeLists] = useState(initialExpandingFields);

  useEffect(() => {
    setExpandedCodeLists(initialExpandingFields);
  }, [schema]);

  const onCodelistExpandToggle = (field) => () =>
    setExpandedCodeLists({ ...expandedCodeLists, [field]: !expandedCodeLists[field] });

  const isCodeListExpanded = (field) => expandedCodeLists[field];

  const [currentShowingScript, setCurrentShowingScripts] = React.useState(null);

  const cols = [
    {
      id: 'compare',
      Header: 'Comparison',

      Cell: ({ original: { diff, changeType } }) => {
        return changeType && changeType !== ChangeType.NONE ? (
          <div className={styles.comparisonCell}>
            <Dot fill={theme.diffColors.dot[changeType]} />
            <span>{compareText[changeType]}</span>
          </div>
        ) : null;
      },
      resizable: false,
      width: 82,
      headerStyle: { textAlign: 'center' },
    },
    {
      Header: 'Field & Description',
      id: 'fieldDescription',
      Cell: ({ original }) => {
        const { name, description, diff, changeType } = original;
        const hasDiff = checkDiff(diff, ['description']);

        return (
          <FieldDescription name={name} description={changeType === ChangeType.UPDATED && hasDiff ? (
            <DiffText oldText={diff.description.left} newText={diff.description.right} />
          ) : (
            description
          )} />
        );
      },
      style: { whiteSpace: 'normal', wordWrap: 'break-word', padding: '8px' },
    },
    {
      Header: 'Data Tier',
      Cell: ({ original }) => {
        const { meta = {}, diff, changeType } = original;

        const hasDiff = checkDiff(diff, ['meta.core', 'meta.primaryId']);

        const tier = getDataTier(meta.primaryId, meta.core);
        return changeType === ChangeType.UPDATED && hasDiff ? (
          <DiffText
            newText={TAG_DISPLAY_NAME[getDataTier(diff.meta.primaryId.right, diff.meta.core.right)]}
            oldText={TAG_DISPLAY_NAME[getDataTier(diff.meta.primaryId.left, diff.meta.core.left)]}
          />
        ) : changeType === ChangeType.DELETED ? (
          TAG_DISPLAY_NAME[tier]
        ) : (
          <Tag type={tier} />
        );
      },
      style: { padding: '8px' },
      width: 85,
    },
    {
      Header: 'Attributes',
      id: 'attributes',
      Cell: ({ original }) => {
        const { restrictions = {}, meta = {}, diff, changeType } = original;

        const hasDiff =
          checkDiff(diff, ['meta.dependsOn']) || checkDiff(diff, ['restrictions.required']);

        const attributes = getAttributes(restrictions.required, meta.dependsOn);
        const diffRequired = get(diff, 'restrictions.required', null);
        const diffDependsOn = get(diff, 'meta.dependsOn', null);

        const leftAttributes = getAttributes(
          diffRequired && diffRequired.left,
          diffDependsOn && diffDependsOn.left,
        );
        const rightAttributes = getAttributes(
          diffRequired && diffRequired.right,
          diffDependsOn && diffDependsOn.right,
        );

        return (
          <div className={styles.tagContainer}>
            {changeType === ChangeType.UPDATED && hasDiff ? (
              <div>
                <div css={rightAttributes.length > 0 ? createdStyle : ''}>
                  {rightAttributes.map((att) => (
                    <div key={att}>{TAG_DISPLAY_NAME[att]}</div>
                  ))}
                </div>
                <div css={leftAttributes.length > 0 ? deletedStyle : ''}>
                  {leftAttributes.map((att) => (
                    <div key={att}>{TAG_DISPLAY_NAME[att]}</div>
                  ))}
                </div>
              </div>
            ) : changeType === ChangeType.DELETED && attributes.length > 0 ? (
              attributes.map((attribute) => TAG_DISPLAY_NAME[attribute])
            ) : attributes.length > 0 ? (
              attributes.map((attribute) => <Tag type={attribute} key={attribute} />)
            ) : null}
          </div>
        );
      },
      style: { padding: '8px' },
      width: 102,
    },
    {
      Header: 'Type',
      id: 'valueType',
      Cell: ({ original: { valueType, diff } }) =>
        diff && diff.valueType ? (
          <DiffText
            oldText={formatFieldType(diff.valueType.left)}
            newText={formatFieldType(diff.valueType.right)}
          />
        ) : (
          formatFieldType(valueType)
        ),
      style: { padding: '8px' },
      width: 70,
    },
    {
      Header: 'Permissible Values',
      id: 'permissibleValues',
      accessor: 'restrictions',
      Cell: ({ original }) => {
        const { name: field, diff, changeType, ...rest } = original;

        const regex = get(rest, 'restrictions.regex', null);
        const codeList = get(rest, 'restrictions.codeList', null);
        const examples = get(rest, 'meta.examples', '');

        const diffRegex = get(diff, 'restrictions.regex');
        const diffExamples = get(diff, 'meta.examples');
        const diffCodeList = get(diff, 'restrictions.codeList');

        const formattedCodes = diffCodeList ? getFormattedCodes(diffCodeList) : null;

        return (
          <div>
            {diffRegex || diffExamples ? (
              <div>
                <div css={deletedStyle}>
                  {diffRegex && <Regex regex={diffRegex.left} />}
                </div>

                <div css={createdStyle}>
                  {diffRegex && <Regex regex={diffRegex.right} />}
                </div>
              </div>
            ) : (
              regex && (
                <div>
                  <Regex regex={regex} />
                </div>
              )
            )}
            {checkDiff(diff, ['restrictions.codeList']) ? (
              <div>{formattedCodes}</div>
            ) : (
              codeList && (
                <CodeList
                  codeList={codeList}
                  onToggle={onCodelistExpandToggle(field)}
                  isExpanded={isCodeListExpanded(field)}
                />
              )
            )}
          </div>
        );
      },

      style: { whiteSpace: 'normal', wordWrap: 'break-word', padding: '8px' },
    },
    {
      Header: 'Notes & Scripts',
      Cell: ({ original: { name, meta, restrictions, diff, changeType } }) => {
        const notes = meta && meta.notes;
        const script = restrictions && restrictions.script;
        const diffScript = get(diff, 'restrictions.script');
        const diffNotes = get(diff, 'meta.notes');
        return (
          <div>
            {changeType === ChangeType.UPDATED && checkDiff(diff, ['meta.notes']) ? (
              <DiffText newText={diffNotes.right} oldText={diffNotes.left} />
            ) : (
              notes
            )}
            {script && changeType === ChangeType.DELETED ? (
              <Button type="secondary" disabled>
                View Scripts
              </Button>
            ) : script || diffScript ? (
              <Script
                name={name}
                script={script}
                diff={diffScript}
                showScript={setCurrentShowingScripts}
              />
            ) : null}
          </div>
        );
      },
      style: { whiteSpace: 'normal', wordWrap: 'break-word', padding: '8px' },
    },
  ].filter((col) => (isDiffShowing ? true : col.id !== 'compare'));
  const containerRef = React.createRef();

  const theme = useTheme();
  const rowColors = theme.diffColors.schemaField;


  const highlightRowDiff = (changeType) => ({
    style: {
      background: rowColors[changeType],
      textDecoration: changeType === ChangeType.DELETED ? 'line-through' : null,
    },
  });

  const tableData = getTableData(isDiffShowing, schema.fields);

  const getDataTier = (primaryId, core) => {
    return primaryId ? TAG_TYPES.ID : core ? TAG_TYPES.CORE : TAG_TYPES.EXTENDED;
  };

  const getAttributes = (required, dependsOn) => {
    const attributes = [];
    if (required) attributes.push(TAG_TYPES.REQUIRED);
    if (dependsOn) attributes.push(TAG_TYPES.CONDITIONAL);
    return attributes;
  };

  const getFormattedCodes = (codeList) => {
    const createdCodes = get(codeList, 'data.added', []);
    const deletedCodes = get(codeList, 'data.deleted', []);

    const left = codeList.left || [];
    const right = codeList.right || [];
    const allCodes = union(left, right);

    return (
      <div>
        {allCodes.map((code) => {
          const formatter = deletedCodes.includes(code)
            ? ChangeType.DELETED
            : createdCodes.includes(code)
            ? ChangeType.CREATED
            : null;

          return <Code key={code} code={code} format={formatter} />;
        })}
      </div>
    );
  };

  return (
    <div ref={menuItem.contentRef} data-menu-title={menuItem.name} className={styles.schema}>
      {currentShowingScript && (
        <ModalPortal>
          <ScriptModal
            field={currentShowingScript.fieldName}
            onCloseClick={() => {
              setCurrentShowingScripts(null);
            }}
          >
            {currentShowingScript.diff ? (
              <CompareCodeBlock
                left={currentShowingScript.diff.left}
                right={currentShowingScript.diff.right}
              />
            ) : (
              <CodeBlock codes={currentShowingScript.content} />
            )}
          </ScriptModal>
        </ModalPortal>
      )}

      <SchemaMeta isDiffShowing={isDiffShowing} fieldCount={schema.fields.length} schema={schema} />

      <div ref={containerRef}>
        <Table
          getTrProps={(state, rowInfo) => {
            const changeType = rowInfo.original.changeType;
            return changeType ? highlightRowDiff(changeType) : {};
          }}
          withRowBorder
          parentRef={containerRef}
          columns={cols}
          data={tableData}
          showPagination={false}
          defaultPageSize={tableData.length}
          pageSize={tableData.length}
          sortable={true}
          cellAlignment="top"
          withOutsideBorder
          highlight={false}
        />
      </div>
    </div>
  );
};

export default Schema;
