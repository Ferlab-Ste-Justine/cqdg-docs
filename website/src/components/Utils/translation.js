import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import TranslationContext from '../IntlProvider/TranslationContextProvider/TranslationContext';
import config from '../IntlProvider/translations';

export const urlTranslate = (lang) => {
    const mapping = {
        en: '/en/',
        fr: '/',
    };
    let pathnameNoLanguage = window.location.pathname.replace(/^\/en/, '').replace(/^\//, '');
    return `${window.location.origin}${mapping[lang]}${pathnameNoLanguage}`;
};

export const t = (id, value = {}) => <FormattedMessage id={id} values={value} />;

export const translate = (key, lang = '') => {
    const locale = useContext(TranslationContext);
    let currentLocale = lang;
    if (isEmpty(currentLocale) && !isEmpty(locale)) {
        currentLocale = locale;
    } else {
        currentLocale = 'en';
    }

    return config[currentLocale][key];
};
