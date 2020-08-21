
import React from 'react';
import styles from './styles.module.scss';
import useAlgolia from '../../hooks/useAlgolia';
import { isSearchAvailable } from '../../utils';



const Search = (props) => {
    if (!isSearchAvailable) return null;

    const inputRef = React.useRef();
    useAlgolia(inputRef);

    return (
        <input
            ref={inputRef}
            id="algolia-search"
            type="search"
            placeholder="Commencer une recherche..."
            aria-label="Commencer une recherche..."
            className={styles['landing-search__input']}
        />
    );
};
export default Search;
