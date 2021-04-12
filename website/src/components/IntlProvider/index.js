import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';

import TranslationContext from './TranslationContextProvider/TranslationContext';
import config from './translations/';

function I18NProvider({ children }) {
    const locale = useContext(TranslationContext);

    return (
        <IntlProvider locale={locale} messages={config[locale]}>
            {children}
        </IntlProvider>
    );
}

export default I18NProvider;
