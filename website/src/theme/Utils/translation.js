import React, {useContext} from 'react';
import { FormattedMessage } from 'react-intl';

import isEmpty from 'lodash/isEmpty';

import TranslationContext from '../TranslationContext';
import config from '../IntlProvider/translations';

export const t = (id, value = {}) => <FormattedMessage id={id} values={value}></FormattedMessage>

export const translate = (key, locale = '') => {
    const context = useContext(TranslationContext);
    console.log('translation context', context);
    let currentLocale = locale;
    if (isEmpty(currentLocale) && !isEmpty(context)) {
        currentLocale = context.state.locale;
    } else {
        currentLocale = 'en';
    }
    console.log('currentLocale translation', currentLocale, config[currentLocale][key]);

    return config[currentLocale][key];
}

