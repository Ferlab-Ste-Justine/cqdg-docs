/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import cloneDeep from 'lodash/cloneDeep';

import Dot from '../Icons/Dot';
import { ChangeType } from '../../types';
import styles from './styles.module.css';

const pluralise = (count, noun) => (count > 1 ? noun + 's' : noun);

const CompareLegend = ({ comparison }) => {
  const theme = useTheme();
  const diffColors = theme.diffColors.dot;
  const { updated, deleted, created } = comparison;
  return (
    <div className={styles.compareLegend}>
      <div>
        <Dot className={styles.icons} fill={diffColors.created} />
        {`${created} ${compareText.created} ${pluralise(created, 'field')}`}
      </div>
      <div>
        <Dot className={styles.icons} fill={diffColors.updated} />
        {`${updated} ${compareText.updated} ${pluralise(updated, 'field')}`}
      </div>
      <div>
        <Dot className={styles.icons} fill={diffColors.deleted} />
        {`${deleted} ${compareText.deleted} ${pluralise(deleted, 'field')}`}
      </div>
    </div>
  );
};

export const compareText = {
  [ChangeType.UPDATED]: 'Updated',
  [ChangeType.DELETED]: 'Deleted',
  [ChangeType.CREATED]: 'New',
};

const defaultCount = { updated: 0, created: 0, deleted: 0 };
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
      updated: dictionaryCount.updated + schemaCount.updated,
      deleted: dictionaryCount.deleted + schemaCount.deleted,
      created: dictionaryCount.created + schemaCount.created,
    };
  }, cloneDeep(defaultCount));

export default CompareLegend;