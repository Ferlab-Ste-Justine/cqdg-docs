import React from 'react';
import Cookies from 'js-cookie';

import { COOKIE_LOCALE } from '../../Utils/cookies-constants';

import TranslationContext from './TranslationContext';

export const supportedLanguages = ['en', 'fr'];
const isValidLocale = (locale) => supportedLanguages.find((l) => l === locale) != null;

export const setLocale = (locale) => {
    Cookies.set(COOKIE_LOCALE, locale);
};
export const getLocale = () => {
    let locale = Cookies.get(COOKIE_LOCALE);
    if (!isValidLocale(locale)) {
        locale = 'fr';
        Cookies.set(COOKIE_LOCALE, locale);
    }

    return locale;
};

const TranslationProvider = ({ children }) => {
    // Get the default locale
    let locale = getLocale();
    return <TranslationContext.Provider value={locale}>{children}</TranslationContext.Provider>;
};

export default TranslationProvider;
