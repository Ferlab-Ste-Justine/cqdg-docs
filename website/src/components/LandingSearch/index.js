
import React from 'react';
import styles from './styles.module.scss';
import useAlgolia from '../../hooks/useAlgolia';
import { isSearchAvailable } from '../../utils';
import { translate } from '../../theme/Utils/translation';

export const SearchButton = ({ children }) => {
    return (
        <button className={styles['landing-search__button']} onClick={() => { }}>
            {children}
        </button>
    )
}

export const Search = (props) => {
    if (!isSearchAvailable) return null;

    const placeholder = translate('landing.header.search.placeholder');

    const inputRef = React.useRef();
    useAlgolia(inputRef);
    return (
        <input
            ref={inputRef}
            id="algolia-search"
            type="search"
            placeholder={placeholder}
            aria-label={placeholder}
            className={styles['landing-search__input']}
        />
    );
};
