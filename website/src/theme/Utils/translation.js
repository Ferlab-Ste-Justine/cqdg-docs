import React from 'react';
import { FormattedMessage } from 'react-intl';

const translation = (id, value = {}) => <FormattedMessage id={id} values={value}></FormattedMessage>

export default translation;