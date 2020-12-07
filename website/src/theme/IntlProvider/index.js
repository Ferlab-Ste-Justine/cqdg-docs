import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';
import config from './translations/'
import TranslationContext from '../TranslationContext';

function I18NProvider({ children }) {
    const { state } = useContext(TranslationContext);
    const locale = state.locale;

    return (
        <IntlProvider messages={config[locale]} locale={locale} >
            {children}
        </IntlProvider>
    )
}

export default I18NProvider;