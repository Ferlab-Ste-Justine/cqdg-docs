import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import BrowserOnly from '@docusaurus/BrowserOnly';

import OpenNew from '../../components/OpenNew';
import TranslationContext from '../../components/TranslationContextProvider/TranslationContext';
import { t, translate } from '../../components/Utils/translation';

import styles from './header.module.scss';

function Navbar() {
    // By default, no link is active
    let [selectedIndex, setSelectedIndex] = useState(-1);

    const { dispatch, state } = useContext(TranslationContext);

    const links = [
        {
            action: () => {
                setSelectedIndex(0);
            },
            href: translate('navbar.submit.link'),
            title: t('submit'),
        },
        {
            action: () => {
                setSelectedIndex(1);
            },
            href: translate('navbar.access.link'),
            title: t('access'),
        },

        {
            action: () => {
                setSelectedIndex(2);
            },
            href: translate('navbar.dictionary.link'),
            title: t('dictionary'),
        },
    ];

    const switchLanguage = () => {
        dispatch({
            locale: state.locale === 'fr' ? 'en' : 'fr',
            type: 'CHANGE_LOCALE',
        });
    };

    return (
        <BrowserOnly>
            {() => (
                <nav className={styles['theme-navbar']}>
                    <Helmet htmlAttributes={{ lang: state.locale }}></Helmet>
                    <a href="/">
                        <img alt="CQDG" src={'/img/navbar/logo.svg'}></img>
                    </a>
                    <div className={styles['theme-navbar__links']}>
                        {links.map((link, index) => (
                            <div
                                className={`${styles['theme-navbar__links__item']} ${
                                    selectedIndex === index ? styles['theme-navbar__links__item--active'] : ''
                                }`}
                                key={index}
                                onClick={link.action}
                            >
                                <a href={link.href}>{link.title}</a>
                            </div>
                        ))}
                        <div className={styles['theme-navbar__links__divider']}></div>
                        <div className={styles['theme-navbar__links__right-item']}>
                            <div className={styles['theme-navbar__links__right-item__text']}>
                                <a
                                    className={styles['theme-navbar__links__right-item__text']}
                                    href="https://portal.qa.cqdg.ferlab.bio/"
                                    target="_blank"
                                >
                                    {t('portal')}
                                </a>
                            </div>
                            <OpenNew />
                        </div>
                        <div className={styles['theme-navbar__links__right-item']}>
                            <div className={styles['theme-navbar__links__right-item__text']}>
                                <a
                                    className={styles['theme-navbar__links__right-item__text']}
                                    href={translate('navbar.website.link')}
                                    target="_blank"
                                >
                                    {t('website')}
                                </a>
                            </div>
                            <OpenNew />
                        </div>
                        <div className={styles['theme-navbar__links__lang']}>
                            <div className={styles['theme-navbar__links__lang__content']} onClick={switchLanguage}>
                                {t('opposite-locale')}
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </BrowserOnly>
    );
}

export default Navbar;
