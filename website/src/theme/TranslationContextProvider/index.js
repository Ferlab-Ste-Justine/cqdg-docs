import React, { useReducer } from 'react';
import Cookies from 'js-cookie';
import TranslationContext from '../TranslationContext';
import { COOKIE_LOCALE } from '../Utils/cookies-constants';

const supportedLanguages = ["en", "fr"];
const isValidLocale = (locale) => supportedLanguages.find(l => l === locale) != null;

const setHtmlLang = (lang) => document.documentElement.lang = lang;

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_LOCALE':
            if (!isValidLocale(action.locale)) {
                throw new Error(`Locale ${action.locale} not supported.`);
            }
            Cookies.set(COOKIE_LOCALE, action.locale);
            setHtmlLang(action.locale);
            return { ...state, locale: action.locale }
        default:
            throw Error();
    }
}

function TranslationProvider({ children }) {
    // Get the default locale
    let defaultLocale = Cookies.get(COOKIE_LOCALE);
    if (!isValidLocale(defaultLocale)) {
        defaultLocale = "fr";
        Cookies.set(COOKIE_LOCALE, defaultLocale)
    }
    const [state, dispatch] = useReducer(reducer, { locale: defaultLocale });
    setHtmlLang(defaultLocale);

    return (
        <TranslationContext.Provider value={{ state, dispatch }}>
            {children}
        </TranslationContext.Provider>
    )
}

export default TranslationProvider;