import React, { useState, useContext } from 'react';
import styles from './header.module.scss';
import OpenNew from '../../components/OpenNew';
import { FormattedMessage } from 'react-intl';
import t from '../Utils/translation'
import TranslationContext from '../TranslationContext';

function Navbar() {
    // By default, no link is active
    let [selectedIndex, setSelectedIndex] = useState(-1);

    const { state, dispatch } = useContext(TranslationContext);

    const links = [{
        title: t('access'),
        action: () => { setSelectedIndex(0); }
    },
    {
        title: t('submit'),
        action: () => { setSelectedIndex(1); }
    },
    {
        title: t('dictionary'),
        action: () => { setSelectedIndex(2); }
    }];

    const switchLanguage = () => {
        dispatch({
            type: "CHANGE_LOCALE",
            locale: state.locale === 'fr' ? 'en' : 'fr'
        });
    }

    return (
        <div className={styles["theme-navbar"]}>
            <img src={"/img/navbar/logo.svg"}></img>
            <div className={styles["theme-navbar__links"]}>
                {links.map((link, index) =>
                    (
                        (index + 1 < links.length) ?
                            <div key={index} onClick={link.action} className={`${styles["theme-navbar__links__item"]} ${(selectedIndex === index) ? styles['theme-navbar__links__item--active'] : ''}`}>
                                {link.title}
                            </div>
                            :
                            <div key={index} onClick={link.action} className={`${styles["theme-navbar__links__item"]} ${styles["theme-navbar__links__item--last"]} ${(selectedIndex === index) ? styles['theme-navbar__links__item--active'] : ''}`}>
                                {link.title}
                            </div>
                    )
                )}
                <div className={styles["theme-navbar__links__divider"]}></div>
                <div className={styles["theme-navbar__links__right-item"]}>
                    <div className={styles["theme-navbar__links__right-item__text"]}>
                        {t('portal')}
                    </div>
                    <OpenNew></OpenNew>
                </div>
                <div className={styles["theme-navbar__links__right-item"]}>
                    <div className={styles["theme-navbar__links__right-item__text"]}>
                        {t('website')}
                    </div>
                    <OpenNew></OpenNew>
                </div>
                <div className={styles["theme-navbar__links__lang"]}>
                    <div onClick={switchLanguage} className={styles["theme-navbar__links__lang__content"]}>
                        {t('opposite-locale')}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar;