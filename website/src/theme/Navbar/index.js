import React, { useState, useContext } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './header.module.scss';
import OpenNew from '../../components/OpenNew';
import { Helmet } from 'react-helmet';
import { t, translate } from '../Utils/translation'
import TranslationContext from '../TranslationContext';

function Navbar() {
    // By default, no link is active
    let [selectedIndex, setSelectedIndex] = useState(-1);

    const { state, dispatch } = useContext(TranslationContext);

    const links = [{
        title: t('submit'),
        href: translate('navbar.submit.link'),
        action: () => { setSelectedIndex(0); }
    },
    {
        title: t('access'),
        href: translate('navbar.access.link'),
        action: () => { setSelectedIndex(1); }
    },
    
    {
        title: t('dictionary'),
        href: translate('navbar.dictionary.link'),
        action: () => { setSelectedIndex(2); }
    }];

    const switchLanguage = () => {
        dispatch({
            type: "CHANGE_LOCALE",
            locale: state.locale === 'fr' ? 'en' : 'fr'
        });
    }

    return (
        <BrowserOnly>
        {() => {
            return <nav className={styles["theme-navbar"]}>
                <Helmet htmlAttributes={{lang: state.locale}}></Helmet>
                <a href="/">
                    <img src={"/img/navbar/logo.svg"} alt="CQDG"></img>
                </a>
                <div className={styles["theme-navbar__links"]}>
                    {links.map((link, index) =>
                        {
                            return <div key={index} onClick={link.action} className={`${styles["theme-navbar__links__item"]} ${(selectedIndex === index) ? styles['theme-navbar__links__item--active'] : ''}`}>
                                    <a href={link.href}>{link.title}</a>
                                </div>
                        }
                    )}
                    <div className={styles["theme-navbar__links__divider"]}></div>
                    <div className={styles["theme-navbar__links__right-item"]}>
                        <div className={styles["theme-navbar__links__right-item__text"]}>
                            <a target="_blank" href="https://portal.qa.cqdg.ferlab.bio/" className={styles["theme-navbar__links__right-item__text"]}>
                                {t('portal')}
                            </a>
                        </div>
                        <OpenNew />
                    </div>
                    <div className={styles["theme-navbar__links__right-item"]}>
                        <div className={styles["theme-navbar__links__right-item__text"]}>
                            <a target="_blank" href={translate('navbar.website.link')} className={styles["theme-navbar__links__right-item__text"]}>{t('website')}</a>
                        </div>
                        <OpenNew />
                    </div>
                    <div className={styles["theme-navbar__links__lang"]}>
                        <div onClick={switchLanguage} className={styles["theme-navbar__links__lang__content"]}>
                            {t('opposite-locale')}
                        </div>
                    </div>
                </div>
            </nav >
        }}
        </BrowserOnly>
    )
}

export default Navbar;