
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import useAlgolia from '../../hooks/useAlgolia';
import { isSearchAvailable } from '../../utils';
import { translate } from '../../theme/Utils/translation';
import TranslationContext from '../../theme/TranslationContext';

export const SearchButton = ({ children }) => {
    return (
        <button className={styles['landing-search__button']} onClick={() => { }}>
            {children}
        </button>
    )
}




export const Search = (props) => {
    if (!isSearchAvailable) return null;

    const { state } = useContext(TranslationContext);
    const placeholder = translate(state.locale, 'landing.header.search.placeholder');

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
