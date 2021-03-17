import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import { t, translate } from '../../components/Utils/translation';

import styles from './styles.module.scss';

const Footer = () => (
    <BrowserOnly>
        {() => (
            <footer className={styles['nav-footer']} id="footer">
                <div className={styles.footerWrapper}>
                    <div className={styles.footerTextWrapper}>
                        <h3 className={styles.footerTitle}>{t('landing.footer.title')}</h3>
                        <p className={styles.footerMoreInfo}>
                            {t('landing.footer.info')}{' '}
                            <a className={styles.footerMoreInfoLink} href="mailto:support@cqdg.ca">
                                support@cqdg.ca
                            </a>
                        </p>
                    </div>
                    <div>
                        <a href={translate('landing.footer.logo.genome.link')} target="_blank">
                            <img alt="genome" src={`/img/icons/genome_qc_logo_RS.svg`} />
                        </a>
                        <a
                            className={styles.footerChuJSLogoLink}
                            href={translate('landing.footer.logo.chusj.link')}
                            target="_blank"
                        >
                            <img alt="chusj" src={`/img/icons/chusj-logo-color.svg`} />
                        </a>
                    </div>
                </div>
            </footer>
        )}
    </BrowserOnly>
);

export default Footer;
