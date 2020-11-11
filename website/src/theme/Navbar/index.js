import React, { useState, useContext } from 'react';
import styles from './header.module.scss';
import OpenNew from '../../components/OpenNew';
import { Helmet } from 'react-helmet';
import { t } from '../Utils/translation'
import TranslationContext from '../TranslationContext';

function Navbar() {
    // By default, no link is active
    let [selectedIndex, setSelectedIndex] = useState(-1);

    const { state, dispatch } = useContext(TranslationContext);

    const links = [{
        title: t('submit'),
        href: '/docs/submission/submitting-clinical-data',
        action: () => { setSelectedIndex(1); }
    },
    {
        title: t('access'),
        href: "/docs/data-access/data-access",
        action: () => { setSelectedIndex(0); }
    },
    
    {
        title: t('dictionary'),
        href: "/dictionary",
        action: () => { setSelectedIndex(2); }
    }];

    const switchLanguage = () => {
        dispatch({
            type: "CHANGE_LOCALE",
            locale: state.locale === 'fr' ? 'en' : 'fr'
        });
    }

    return (
        <nav className={styles["theme-navbar"]}>
            <Helmet htmlAttributes={{lang: state.locale}}></Helmet>
            <a href="/">
                <img src={"/img/navbar/logo.svg"} alt="CQDG"></img>
            </a>
            <div className={styles["theme-navbar__links"]}>
                {links.map((link, index) =>
                    (
                        (index + 1 < links.length) ?
                            <div key={index} onClick={link.action} className={`${styles["theme-navbar__links__item"]} ${(selectedIndex === index) ? styles['theme-navbar__links__item--active'] : ''}`}>
                                <a href={link.href}>{link.title}</a>
                            </div>
                            :
                            <div key={index} onClick={link.action} className={`${styles["theme-navbar__links__item"]} ${styles["theme-navbar__links__item--last"]} ${(selectedIndex === index) ? styles['theme-navbar__links__item--active'] : ''}`}>
                                <a href={link.href}>{link.title}</a>
                            </div>
                    )
                )}
                <div className={styles["theme-navbar__links__divider"]}></div>
                <div className={styles["theme-navbar__links__right-item"]}>
                    <div className={styles["theme-navbar__links__right-item__text"]}>
                        <a className={styles["theme-navbar__links__right-item__text"]}>
                            {t('portal')}
                        </a>
                    </div>
                    <OpenNew></OpenNew>
                </div>
                <div className={styles["theme-navbar__links__right-item"]}>
                    <div className={styles["theme-navbar__links__right-item__text"]}>
                        <a className={styles["theme-navbar__links__right-item__text"]}>{t('website')}</a>
                    </div>
                    <OpenNew></OpenNew>
                </div>
                <div className={styles["theme-navbar__links__lang"]}>
                    <div onClick={switchLanguage} className={styles["theme-navbar__links__lang__content"]}>
                        {t('opposite-locale')}
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar;