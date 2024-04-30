import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import BrowserOnly from '@docusaurus/BrowserOnly';

import { setLocale } from '../../components/IntlProvider/TranslationContextProvider';
import TranslationContext from '../../components/IntlProvider/TranslationContextProvider/TranslationContext';
import OpenNew from '../../components/OpenNew';
import { t, translate, urlTranslate } from '../../components/Utils/translation';
import { CQDG_PORTAL_URL } from '../../utils';

import styles from './header.module.scss';

function Navbar() {
    // By default, no link is active
    let [selectedIndex, setSelectedIndex] = useState(-1);

    const locale = useContext(TranslationContext);

    const links = [];

    const switchLanguage = () => {
        const newLang = locale === 'fr' ? 'en' : 'fr';
        setLocale(newLang);
        window.location.href = urlTranslate(newLang);
    };

    return (
        <BrowserOnly>
            {() => (
                <nav className={styles['theme-navbar']}>
                    <Helmet htmlAttributes={{ lang: locale }}></Helmet>
                    <a href={translate('navbar.home.link')}>
                        <img alt="CQDG" src={'/img/logos/cqdg.svg'}></img>
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
                        <div className={styles['theme-navbar__links__right-item']}>
                            <div className={styles['theme-navbar__links__right-item__text']}>
                                <a
                                    className={styles['theme-navbar__links__right-item__text']}
                                    href={CQDG_PORTAL_URL}
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
                        <div className={styles['theme-navbar__links__right-item']}>
                            <div className={styles['theme-navbar__links__right-item__text']}>
                                <a
                                    className={styles['theme-navbar__links__right-item__text']}
                                    href={process.env.CQDG_DOCS_URL}
                                    target="_blank"
                                >
                                    {t('documentation')}
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
