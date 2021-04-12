import React from 'react';
import Typography from '@icgc-argo/uikit/Typography';

import { t } from '../../components/Utils/translation';

const Meta = ({ fields, files }) => (
    <Typography color="#151c3d" variant="data">
        {t('dictionary.files.quantity', { fields_count: fields, file_count: files })}
    </Typography>
);

export default Meta;
