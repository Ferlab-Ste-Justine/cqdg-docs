import React from 'react';
import Typography from '@icgc-argo/uikit/Typography';
import flattenDeep from 'lodash/flattenDeep';
import get from 'lodash/get';
import startCase from 'lodash/startCase';
import uniq from 'lodash/uniq';

import { t } from '../../components/Utils/translation';
import { ChangeType } from '../../types';
import Select from '../Select';
import { TAG_TYPES } from '../Tag';

import styles from './styles.module.css';

export const NO_ACTIVE_FILTER = 'no_active_filter';
export const DEFAULT_FILTER = { label: t('dictionary.action.all'), value: NO_ACTIVE_FILTER };

const FileFilters = ({
    tiers = [],
    attributes = [],
    comparisons = [],
    searchParams = {},
    isDiffShowing = false,
    onSearch = (e) => console.log(e.target.val),
}) => {
    // update search params
    const onSelect = (filterName) => ({ value }) => onSearch({ ...searchParams, ...{ [filterName]: value } });
    return (
        <Typography color="#151c3d" variant="data">
            <div className={styles.fileFilters}>
                <div className={styles.dataSelectors}>
                    {isDiffShowing && (
                        <>
                            {t('dictionary.data.comparison')}:{' '}
                            <Select
                                className={styles.select}
                                onChange={onSelect('comparison')}
                                options={[DEFAULT_FILTER, ...comparisons]}
                                value={searchParams.comparison}
                            />
                        </>
                    )}
                    {t('dictionary.data.tier')}:{' '}
                    <Select
                        className={styles.select}
                        onChange={onSelect('tier')}
                        options={[DEFAULT_FILTER, ...tiers]}
                        value={searchParams.tier}
                    />
                    {t('dictionary.data.attribute')}:{' '}
                    <Select
                        className={styles.select}
                        onChange={onSelect('attribute')}
                        options={[DEFAULT_FILTER, ...attributes]}
                        value={searchParams.attribute}
                    />
                </div>
            </div>
        </Typography>
    );
};

const comparisonFilterDisplay = {
    created: t('dictionary.data.new.fields'),
    deleted: t('dictionary.data.deleted.fields'),
    updated: t('dictionary.data.updated.fields'),
};

export const generateComparisonFilter = (key) => ({
    label: comparisonFilterDisplay[key],
    value: key,
});

export const generateFilter = (item) => ({
    label: startCase(item),
    value: item,
});

export const createFilters = (schemas) => {
    const fields = schemas.map((schema) => schema.fields);

    const filters = flattenDeep(fields).reduce(
        (filters, field) => {
            const primaryId = get(field, 'meta.primaryId');
            const core = get(field, 'meta.core');
            const dependsOn = get(field, 'meta.dependsOn');
            const restrictions = get(field, 'restrictions', false);
            const { changeType } = field;

            if (primaryId) {
                filters.tiers.push(TAG_TYPES.ID);
            }

            if (!!restrictions) {
                filters.attributes.push(TAG_TYPES.REQUIRED);
            }

            if (dependsOn) {
                filters.attributes.push(TAG_TYPES.CONDITIONAL);
            }

            if (core) {
                filters.tiers.push(TAG_TYPES.CORE);
            }

            if (!core && !primaryId) {
                filters.tiers.push(TAG_TYPES.EXTENDED);
            }

            filters.comparison.push(changeType);

            return filters;
        },
        { attributes: [], comparison: [], tiers: [] }
    );
    return {
        attributes: uniq(filters.attributes),
        // comparison type NONE already accounted for in default filter
        comparison: uniq(filters.comparison)
            .filter((f) => f !== ChangeType.NONE)
            // filter out undefined comparison value
            .filter(Boolean),

        tiers: uniq(filters.tiers),
    };
};

export const comparisonFilter = (comparison) => (field) => {
    if (comparison === NO_ACTIVE_FILTER) return true;

    return field.changeType === comparison;
};

export const attributeFilter = (attribute) => (field) => {
    if (attribute === NO_ACTIVE_FILTER) return true;
    const required = get(field, 'restrictions.required', false);
    const dependsOn = get(field, 'meta.dependsOn', false);

    return (
        (attribute === TAG_TYPES.CONDITIONAL && Boolean(dependsOn)) ||
        (attribute === TAG_TYPES.REQUIRED && required) ||
        false
    );
};

export const tierFilter = (tier) => (field) => {
    if (tier === NO_ACTIVE_FILTER) return true;

    const primaryId = get(field, 'meta.primaryId', false);
    const core = get(field, 'meta.core', false);

    return (
        (tier === TAG_TYPES.ID && primaryId) ||
        (tier === TAG_TYPES.CORE && core) ||
        (tier === TAG_TYPES.EXTENDED && !core && !primaryId) ||
        false
    );
};

export const defaultSearchParams = {
    attribute: DEFAULT_FILTER.value,
    comparison: DEFAULT_FILTER.value,
    tier: DEFAULT_FILTER.value,
};

export default FileFilters;
