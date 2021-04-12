/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import cloneDeep from 'lodash/cloneDeep';

import { t } from '../../components/Utils/translation';
import { ChangeType } from '../../types';
import Dot from '../Icons/Dot';

import styles from './styles.module.css';

const pluralise = (count, noun) => (count > 1 ? noun + 's' : noun);

const CompareLegend = ({ comparison }) => {
    const theme = useTheme();
    const diffColors = theme.diffColors.dot;
    const { created, deleted, updated } = comparison;
    return (
        <div className={styles.compareLegend}>
            <div>
                <Dot className={styles.icons} fill={diffColors.created} />
                {t('dictionary.data.new.count', { count: created })}
            </div>
            <div>
                <Dot className={styles.icons} fill={diffColors.updated} />
                {t('dictionary.data.updated.count', { count: updated })}
            </div>
            <div>
                <Dot className={styles.icons} fill={diffColors.deleted} />
                {t('dictionary.data.deleted.count', { count: deleted })}
            </div>
        </div>
    );
};

export const compareText = {
    [ChangeType.UPDATED]: t('dictionary.data.updated'),
    [ChangeType.DELETED]: t('dictionary.data.deleted'),
    [ChangeType.CREATED]: t('dictionary.data.new'),
};

const defaultCount = { created: 0, deleted: 0, updated: 0 };
export const generateComparisonCounts = (schemas) =>
    schemas.reduce((dictionaryCount, schema) => {
        const schemaCount = schema.fields.reduce((fieldCount, field) => {
            switch (field.changeType) {
                case ChangeType.CREATED:
                    fieldCount.created++;
                    break;
                case ChangeType.DELETED:
                    fieldCount.deleted++;
                    break;
                case ChangeType.UPDATED:
                    fieldCount.updated++;
            }
            return fieldCount;
        }, cloneDeep(defaultCount));

        return {
            created: dictionaryCount.created + schemaCount.created,
            deleted: dictionaryCount.deleted + schemaCount.deleted,
            updated: dictionaryCount.updated + schemaCount.updated,
        };
    }, cloneDeep(defaultCount));

export default CompareLegend;
