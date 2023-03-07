import React, { useEffect, useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Table from '@icgc-argo/uikit/Table';
import DefaultTag from '@icgc-argo/uikit/Tag';
import { useTheme } from 'emotion-theming';
import get from 'lodash/get';
import startCase from 'lodash/startCase';
import union from 'lodash/union';

import { ModalPortal } from '../../pages/dictionary';
import { ChangeType } from '../../types';
import { Button } from '../Button';
import CodeBlock, { CompareCodeBlock } from '../CodeBlock';
import { compareText } from '../CompareLegend';
import Dot from '../Icons/Dot';
import ScriptModal from '../ScriptModal';
import Tag, { TAG_DISPLAY_NAME, TAG_TYPES } from '../Tag';
import { DataTypography, SchemaTitle } from '../Typography';
import { t } from '../Utils/translation';

import CodeList, { Code } from './CodeList';
import { createdStyle, deletedStyle, DiffText, updatedStyle } from './DiffText';
import Regex from './Regex';
import { Script } from './TableComponents';

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

const FieldDescription = ({ description, name }) => (
    <div className={styles.fieldDescription}>
        <div className={styles.name}>{name}</div>
        <div>{description}</div>
    </div>
);

const FileExample = ({ name }) => (
    <div className={styles.fileExemple}>
        {t('dictionary.table.file.example')}: <span>{`${name}`}</span>
        [-optional-extension]
        <span>.tsv</span>
    </div>
);

const FieldsTag = ({ fieldCount }) => (
    <DefaultTag className={`${styles.tag} ${styles.fields}`} style={{ marginTop: '3px' }}>
        {fieldCount} {t('dictionary.data.field')}
        {`${fieldCount > 1 ? 's' : ''}`}
    </DefaultTag>
);

const getTableData = (isDiffShowing, fields) =>
    isDiffShowing
        ? fields
        : fields
              .filter((field) => field.changeType !== ChangeType.DELETED)
              .map((field) => ({ ...field, changeType: null, diff: null }));

const checkDiff = (diff, fields) => fields.reduce((acc, field) => acc && Boolean(get(diff, field, false)), true);

const SchemaMeta = ({ fieldCount, schema }) => {
    const { description, diff, name } = schema;
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

const Schema = ({ isDiffShowing, menuItem, schema }) => {
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
        [schema]
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
            Cell: ({ original: { changeType, diff } }) =>
                changeType && changeType !== ChangeType.NONE ? (
                    <div className={styles.comparisonCell}>
                        <Dot fill={theme.diffColors.dot[changeType]} />
                        <span>{compareText[changeType]}</span>
                    </div>
                ) : null,
            Header: t('dictionary.data.comparison'),

            headerStyle: { textAlign: 'center' },
            id: 'compare',
            resizable: false,
            width: 82,
        },
        {
            Cell: ({ original }) => {
                const { changeType, description, diff, name } = original;
                const hasDiff = checkDiff(diff, ['description']);

                return (
                    <FieldDescription
                        description={
                            changeType === ChangeType.UPDATED && hasDiff ? (
                                <DiffText newText={diff.description.right} oldText={diff.description.left} />
                            ) : (
                                description
                            )
                        }
                        name={name}
                    />
                );
            },
            Header: t('dictionary.table.header.field'),
            id: 'fieldDescription',
            style: { padding: '8px', whiteSpace: 'normal', wordWrap: 'break-word' },
        },
        {
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
            Header: t('dictionary.data.tier'),
            style: { padding: '8px' },
            width: 125,
        },
        {
            Cell: ({ original }) => {
                const { restrictions = {}, meta = {}, diff, changeType } = original;

                const hasDiff = checkDiff(diff, ['meta.dependsOn']) || checkDiff(diff, ['restrictions.required']);

                const attributes = getAttributes(restrictions.required, meta.dependsOn);
                const diffRequired = get(diff, 'restrictions.required', null);
                const diffDependsOn = get(diff, 'meta.dependsOn', null);

                const leftAttributes = getAttributes(
                    diffRequired && diffRequired.left,
                    diffDependsOn && diffDependsOn.left
                );
                const rightAttributes = getAttributes(
                    diffRequired && diffRequired.right,
                    diffDependsOn && diffDependsOn.right
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
                            attributes.map((attribute) => <Tag key={attribute} type={attribute} />)
                        ) : null}
                    </div>
                );
            },
            Header: t('dictionary.data.attribute'),
            id: 'attributes',
            style: { padding: '8px' },
            width: 102,
        },
        {
            Cell: ({ original: { diff, valueType } }) =>
                diff && diff.valueType ? (
                    <DiffText
                        newText={formatFieldType(diff.valueType.right)}
                        oldText={formatFieldType(diff.valueType.left)}
                    />
                ) : (
                    formatFieldType(valueType)
                ),
            Header: t('dictionary.table.header.type'),
            id: 'valueType',
            style: { padding: '8px' },
            width: 70,
        },
        {
            accessor: 'restrictions',
            Cell: ({ original }) => {
                const { changeType, diff, name: field, ...rest } = original;

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
                                <div css={deletedStyle}>{diffRegex && <Regex regex={diffRegex.left} />}</div>

                                <div css={createdStyle}>{diffRegex && <Regex regex={diffRegex.right} />}</div>
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
                                    isExpanded={isCodeListExpanded(field)}
                                    onToggle={onCodelistExpandToggle(field)}
                                />
                            )
                        )}
                    </div>
                );
            },
            Header: t('dictionary.table.header.values'),
            id: 'permissibleValues',

            style: { padding: '8px', whiteSpace: 'normal', wordWrap: 'break-word' },
        },
        {
            Cell: ({ original: { changeType, diff, meta, name, restrictions } }) => {
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
                            <Button disabled type="secondary">
                                View Scripts
                            </Button>
                        ) : script || diffScript ? (
                            <Script
                                diff={diffScript}
                                name={name}
                                script={script}
                                showScript={setCurrentShowingScripts}
                            />
                        ) : null}
                    </div>
                );
            },
            Header: t('dictionary.table.header.note'),
            style: { padding: '8px', whiteSpace: 'normal', wordWrap: 'break-word' },
        },
    ].filter((col) => (isDiffShowing ? true : col.id !== 'compare'));
    const containerRef = React.createRef();

    const theme = useTheme();
    const rowColors = theme.diffColors.schemaField;

    const highlightRowDiff = (changeType) => ({
        className: styles[`row-${changeType}`],
        style: {
            background: rowColors[changeType],
        },
    });

    const tableData = getTableData(isDiffShowing, schema.fields);

    const getDataTier = (primaryId, core) => (primaryId ? TAG_TYPES.ID : core ? TAG_TYPES.CORE : TAG_TYPES.EXTENDED);

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

                    return <Code code={code} format={formatter} key={code} />;
                })}
            </div>
        );
    };

    return (
        <div className={styles.schema} data-menu-title={menuItem.name} ref={menuItem.contentRef}>
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

            <SchemaMeta fieldCount={schema.fields.length} isDiffShowing={isDiffShowing} schema={schema} />

            <div ref={containerRef}>
                <Table
                    cellAlignment="top"
                    columns={cols}
                    data={tableData}
                    defaultPageSize={tableData.length}
                    getTrProps={(state, rowInfo) => {
                        const { changeType } = rowInfo.original;
                        return changeType ? highlightRowDiff(changeType) : {};
                    }}
                    highlight={false}
                    pageSize={tableData.length}
                    parentRef={containerRef}
                    showPagination={false}
                    sortable={true}
                    withOutsideBorder
                    withRowBorder
                />
            </div>
        </div>
    );
};

export default Schema;
