import React, { useReducer } from 'react';
import Cookies from 'js-cookie';

import { COOKIE_LOCALE } from '../Utils/cookies-constants';

import TranslationContext from './TranslationContext';

const supportedLanguages = ['en', 'fr'];
const isValidLocale = (locale) => supportedLanguages.find((l) => l === locale) != null;

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_LOCALE':
            if (!isValidLocale(action.locale)) {
                throw new Error(`Locale ${action.locale} not supported.`);
            }
            Cookies.set(COOKIE_LOCALE, action.locale);
            return { ...state, locale: action.locale };
        default:
            throw Error();
    }
};

function TranslationProvider({ children }) {
    // Get the default locale
    let defaultLocale = Cookies.get(COOKIE_LOCALE);
    if (!isValidLocale(defaultLocale)) {
        defaultLocale = 'fr';
        Cookies.set(COOKIE_LOCALE, defaultLocale);
    }
    const [state, dispatch] = useReducer(reducer, { locale: defaultLocale });

    return <TranslationContext.Provider value={{ dispatch, state }}>{children}</TranslationContext.Provider>;
}

export default TranslationProvider;
