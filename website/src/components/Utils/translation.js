import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import config from '../IntlProvider/translations';
import TranslationContext from '../TranslationContextProvider/TranslationContext';

export const t = (id, value = {}) => <FormattedMessage id={id} values={value}></FormattedMessage>;

export const translate = (key, locale = '') => {
    const context = useContext(TranslationContext);
    let currentLocale = locale;
    if (isEmpty(currentLocale) && !isEmpty(context)) {
        currentLocale = context.state.locale;
    } else {
        currentLocale = 'en';
    }

    return config[currentLocale][key];
};
