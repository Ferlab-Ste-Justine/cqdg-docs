import React, { createRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Modal from '@icgc-argo/uikit/Modal';
import defaultTheme from '@icgc-argo/uikit/theme/defaultTheme';
import Typography from '@icgc-argo/uikit/Typography';
import Layout from '@theme/Layout';
import { ThemeProvider } from 'emotion-theming';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import merge from 'lodash/merge';
import startCase from 'lodash/startCase';

import { Button, ResetButton } from '../../components/Button';
import { Display, DownloadButtonContent } from '../../components/common';
import CompareLegend, { generateComparisonCounts } from '../../components/CompareLegend';
import SchemaMenu from '../../components/ContentMenu';
import Dictionary from '../../components/Dictionary';
import FileFilters, {
    attributeFilter,
    comparisonFilter,
    createFilters,
    DEFAULT_FILTER,
    defaultSearchParams,
    generateComparisonFilter,
    generateFilter,
    NO_ACTIVE_FILTER,
    tierFilter,
} from '../../components/FileFilters';
import Close from '../../components/Icons/Close';
import { getLocale } from '../../components/IntlProvider/TranslationContextProvider';
import Meta from '../../components/Meta';
import StyleWrapper from '../../components/StyleWrapper';
import { t } from '../../components/Utils/translation';
import VersionSelect from '../../components/VersionSelect';
import { createSchemasWithDiffs, getDictionary, getDictionaryDiff } from '../../helpers/schema';
import theme from '../../theme/theme';
import { ChangeType } from '../../types';
import { getLatestVersion } from '../../utils';

import styles from './styles.module.css';

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
              <div style={{ height: '100vh', width: '100vw' }}>
                  <Modal.Overlay>{children}</Modal.Overlay>
              </div>,
              ref
          )
        : null;
};

const DataDictionary = () => {
    const context = useDocusaurusContext();
    const {
        siteConfig: {
            customFields: { GATEWAY_API_ROOT = '', PLATFORM_UI_ROOT = '' },
        },
    } = context;

    const preloadLocale = getLocale();
    const data = require(`./data-${preloadLocale}.json`);
    const preloadedData = { data: data.dictionary, version: data.currentVersion };
    const [searchParams, setSearchParams] = useState(defaultSearchParams);

    const { versions } = data;
    const [version, setVersion] = useState(data.currentVersion);
    const [activeSchemas, setActiveSchemas] = useState(preloadedData.data.schemas);

    const [diffVersion, setDiffVersion] = useState(versions[1]);
    const [isDiffShowing, setIsDiffShowing] = useState(false);

    const TAB_STATE = Object.freeze({
        DETAILS: 'DETAILS',
        OVERVIEW: 'OVERVIEW',
    });
    const [selectedTab] = React.useState(TAB_STATE.DETAILS);

    const isLatestSchema = getLatestVersion() === version ? true : false;

    useEffect(() => {
        const resolveSchemas = async () => {
            try {
                const dict = await getDictionary(version, preloadLocale);
                const diff = await getDictionaryDiff(version, diffVersion, preloadLocale);
                const schemas =
                    diff && isDiffShowing ? createSchemasWithDiffs(dict.schemas, diff.schemas) : dict.schemas;

                setActiveSchemas(schemas);
            } catch (e) {
                console.error('Cannot resolve schemas', e);
                setActiveSchemas([]);
            }
        };
        resolveSchemas();
    }, [version, diffVersion, isDiffShowing]);

    const downloadTsvFileTemplate = async (fileName) => {
        const zip = new JSZip();
        const dict = await getDictionary(version);

        dict.schemas.forEach((schema) => {
            const template = createTsvTemplate(schema);
            zip.file(`${schema.name}_v${version}.tsv`, template);
        });

        const archive = await zip.generateAsync({ type: 'blob' });
        saveAs(archive, 'file-templates.zip');
    };
    const createTsvTemplate = (schema) => {
        const header = schema.fields.map((f) => f.name).join('\t') + '\n';
        return header;
    };

    // filter schemas
    const filteredSchemas = React.useMemo(
        () =>
            //  filter DELETED schemas out if not showing diff
            activeSchemas
                .filter((schema) => (isDiffShowing ? Boolean : schema.changeType !== ChangeType.DELETED))
                .map((schema) => ({
                    ...schema,
                    fields: schema.fields.filter((field) =>
                        isDiffShowing ? Boolean : field.changeType !== ChangeType.DELETED
                    ),
                }))
                // filter schemas based on active/search
                .map((schema) => {
                    const { attribute, comparison, tier } = searchParams;
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
        [activeSchemas, isDiffShowing, searchParams]
    );

    const comparisonCounts = generateComparisonCounts(filteredSchemas);
    const fileCount = filteredSchemas.length;
    const fieldCount = filteredSchemas.reduce((acc, schema) => acc + schema.fields.length, 0);

    const filters = React.useMemo(() => createFilters(activeSchemas), [activeSchemas]);

    const generateMenuContents = (activeSchemas) => {
        const activeSchemaNames = activeSchemas.map((s) => s.name);
        return activeSchemas.map((schema) => ({
            active: false,
            contentRef: createRef(),
            disabled: !activeSchemaNames.includes(schema.name),
            key: schema.name,
            name: startCase(schema.name),
        }));
    };

    const menuContents = generateMenuContents(filteredSchemas);
    const mergedTheme = merge(defaultTheme, theme);

    return (
        <ThemeProvider theme={mergedTheme}>
            <div className={styles.modalCont} id="modalCont" ref={modalPortalRef} />
            <Layout permalink="dictionary">
                <StyleWrapper>
                    <div className={styles.mainContainer}>
                        <div className={styles.dict}>
                            <div className={styles.heading}>
                                <Typography as="h1" bold className={styles.mainTilte} color="primary" variant="title">
                                    {t('dictionary.title')}
                                </Typography>
                                <Typography color="primary" variant="paragraph">
                                    {t('dictionary.main.paragraph')}{' '}
                                    <Link className={styles.link} to={PLATFORM_UI_ROOT}>
                                        {t('dictionary.main.paragraph.link.text')}
                                    </Link>
                                </Typography>
                            </div>
                            <div className={styles.infobar}>
                                <div>
                                    <VersionSelect
                                        onChange={(e) => setVersion(e.value)}
                                        value={version}
                                        versions={versions}
                                    />
                                    <Button className={styles.compareButton} onClick={() => setIsDiffShowing(true)}>
                                        {t('dictionary.action.compare')} ...
                                    </Button>
                                    {isDiffShowing && (
                                        <div className={styles.compareSection}>
                                            <VersionSelect
                                                onChange={(data) => setDiffVersion(data.value)}
                                                value={diffVersion}
                                                versions={versions.filter((v) => v !== version)}
                                            />
                                            <CompareLegend comparison={comparisonCounts} />
                                            <Button
                                                className={styles.clear}
                                                onClick={() => {
                                                    setIsDiffShowing(false);
                                                    setSearchParams({
                                                        ...searchParams,
                                                        comparison: DEFAULT_FILTER.value,
                                                    });
                                                }}
                                                type="secondary"
                                            >
                                                <Close className={styles.closeIcon} />
                                                {t('dictionary.action.clear')}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.downloads}>
                                    <Button onClick={() => downloadTsvFileTemplate(`all`)} type="secondary">
                                        <DownloadButtonContent>{t('dictionary.file.template')}</DownloadButtonContent>
                                    </Button>
                                </div>
                            </div>

                            <Display visible={selectedTab === TAB_STATE.DETAILS}>
                                <div className={styles.filter}>
                                    <Meta fields={fieldCount} files={fileCount} />
                                    <div className={styles.searchContainer}>
                                        <FileFilters
                                            attributes={filters.attributes.map(generateFilter)}
                                            comparisons={
                                                version === diffVersion
                                                    ? []
                                                    : filters.comparison.map(generateComparisonFilter)
                                            }
                                            isDiffShowing={isDiffShowing}
                                            onSearch={(search) => setSearchParams(search)}
                                            searchParams={searchParams}
                                            tiers={filters.tiers.map(generateFilter)}
                                        />
                                        <ResetButton
                                            disabled={
                                                searchParams.tier === NO_ACTIVE_FILTER &&
                                                searchParams.attribute === NO_ACTIVE_FILTER &&
                                                searchParams.comparison === NO_ACTIVE_FILTER
                                            }
                                            onClick={() => setSearchParams(defaultSearchParams)}
                                        >
                                            {t('dictionary.action.reset')}
                                        </ResetButton>
                                    </div>
                                </div>
                            </Display>

                            <Display visible={selectedTab === TAB_STATE.DETAILS}>
                                <div className={styles.dictionary}>
                                    <Dictionary
                                        isDiffShowing={isDiffShowing}
                                        isLatestSchema={isLatestSchema}
                                        menuContents={menuContents}
                                        schemas={filteredSchemas}
                                    />
                                </div>
                            </Display>
                        </div>

                        <Display visible={selectedTab === TAB_STATE.DETAILS}>
                            <div className={styles.menu}>
                                <SchemaMenu
                                    contents={menuContents}
                                    dataAttributes={filters.attributes.map((d) => ({
                                        content: startCase(d),
                                        value: d,
                                    }))}
                                    dataTiers={filters.tiers.map((d) => ({ content: startCase(d), value: d }))}
                                    scrollYOffset="70"
                                    title={t('dictionary.menu.content.title')}
                                />
                            </div>
                        </Display>
                    </div>
                </StyleWrapper>
            </Layout>
        </ThemeProvider>
    );
};

export default DataDictionary;
