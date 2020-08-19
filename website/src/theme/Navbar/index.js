import React, { useState } from 'react';
import styles from './header.module.scss';
import OpenNew from '../../components/OpenNew';

function Navbar() {
    // By default, no link is active
    let [selectedIndex, setSelectedIndex] = useState(-1);

    const links = [{
        title: 'Accès',
        action: () => { setSelectedIndex(0); }
    },
    {
        title: 'Soumettre',
        action: () => { setSelectedIndex(1); }
    },
    {
        title: 'Dictionnaire',
        action: () => { setSelectedIndex(2); }
    }];

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
                    <div className={styles["theme-navbar__links__right-item__text"]}>Portail</div>
                    <OpenNew></OpenNew>
                </div>
                <div className={styles["theme-navbar__links__right-item"]}>
                    <div className={styles["theme-navbar__links__right-item__text"]}>Site web</div>
                    <OpenNew></OpenNew>
                </div>
                <div className={styles["theme-navbar__links__lang"]}>
                    <div className={styles["theme-navbar__links__lang__content"]}>
                        EN
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;