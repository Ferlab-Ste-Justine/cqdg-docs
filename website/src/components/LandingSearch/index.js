import React, { useContext } from 'react';
import clsx from 'clsx';

import useAlgolia from '../../hooks/useAlgolia';
import { isSearchAvailable } from '../../utils';
import TranslationContext from '../TranslationContextProvider/TranslationContext';
import { translate } from '../Utils/translation';

import styles from './styles.module.scss';

export const SearchButton = ({ children }) => (
    <button className={styles['landing-search__button']} onClick={() => {}}>
        {children}
    </button>
);

export const Search = (props) => {
    if (!isSearchAvailable) return null;

    const context = useContext(TranslationContext);
    const lang = context.state.locale;
    const placeholder = translate('landing.header.search.placeholder');
    const inputRefEn = React.useRef();
    const inputRefFr = React.useRef();

    useAlgolia(inputRefEn, 'en');
    useAlgolia(inputRefFr, 'fr');
    return (
        <>
            <input
                aria-label={placeholder}
                className={clsx(styles['landing-search__input'], {
                    [styles['landing-search__input--hide']]: lang !== 'en',
                })}
                id="algolia-search-en"
                placeholder={placeholder}
                ref={inputRefEn}
                type="search"
            />
            <input
                aria-label={placeholder}
                className={clsx(styles['landing-search__input'], {
                    [styles['landing-search__input--hide']]: lang !== 'fr',
                })}
                id="algolia-search-fr"
                placeholder={placeholder}
                ref={inputRefFr}
                type="search"
            />
        </>
    );
};
