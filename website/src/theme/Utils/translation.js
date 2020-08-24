import React from 'react';
import { FormattedMessage } from 'react-intl';
import config from '../IntlProvider/translations';

export const t = (id, value = {}) => <FormattedMessage id={id} values={value}></FormattedMessage>

export const translate = (locale, key) => config[locale][key];

