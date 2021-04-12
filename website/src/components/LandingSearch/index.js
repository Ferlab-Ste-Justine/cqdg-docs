import React, { useContext } from 'react';

import useAlgolia from '../../hooks/useAlgolia';
import { isSearchAvailable } from '../../utils';
import TranslationContext from '../IntlProvider/TranslationContextProvider/TranslationContext';
import { translate } from '../Utils/translation';

import styles from './styles.module.scss';

export const SearchButton = ({ children }) => (
    <button className={styles['landing-search__button']} onClick={() => {}}>
        {children}
    </button>
);

export const Search = (props) => {
    if (!isSearchAvailable) return null;

    const locale = useContext(TranslationContext);
    const placeholder = translate('landing.header.search.placeholder');
    const inputRef = React.useRef();

    useAlgolia(inputRef, locale);
    return (
        <input
            aria-label={placeholder}
            className={styles['landing-search__input']}
            id="algolia-search"
            placeholder={placeholder}
            ref={inputRef}
            type="search"
        />
    );
};
