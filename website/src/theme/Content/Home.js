import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

import BlocItem from '../../components/BlocItem';
import { Search, SearchButton } from '../../components/LandingSearch';
import OpenNew from '../../components/OpenNew';
import PillsBackground from '../../components/PillsBackground';
import { t, translate } from '../../components/Utils/translation';

import styles from './styles.module.scss';

const SplashContent = (props) => <div className={props.className}>{props.children}</div>;

const Home = () => (
    <>
        <div className={styles['pages__splash']}>
            <SplashContent className={styles['pages__splash__content']}>
                <h1 className={styles['pages__splash__content__title']}>{t('landing.header.title')}</h1>
                <p className={styles['pages__splash__content__description']}>{t('landing.header.subtitle')}</p>
                <BrowserOnly>
                    {() => (
                        <p className={styles['pages__splash__content__search']}>
                            <Search />
                            <SearchButton>{t('landing.header.search.button')}</SearchButton>
                        </p>
                    )}
                </BrowserOnly>

                <div className={styles['pages__splash__content__link']}>
                    <a
                        className={styles['pages__splash__content__link__text']}
                        href="https://portail.qa.juno.cqdg.ferlab.bio/"
                        target="_blank"
                    >
                        {t('landing.header.to_portal')}
                    </a>

                    <OpenNew />
                </div>
            </SplashContent>
            <PillsBackground height="489px" />
        </div>
        <div className={styles['pages__blocs']}>
            <BlocItem href={translate('navbar.submit.link')} icon="Cloud">
                <div className={styles['pages__blocs__item']}>
                    <h2 className={styles['pages__blocs__item__title']}>{t('landing.content.items.submit.title')}</h2>
                    <p className={styles['pages__blocs__item__description']}>
                        {t('landing.content.items.submit.subtitle')}
                    </p>
                </div>
            </BlocItem>

            <BlocItem href={translate('navbar.access.link')} icon="Genetic">
                <div className={styles['pages__blocs__item']}>
                    <h2 className={styles['pages__blocs__item__title']}>{t('landing.content.items.access.title')}</h2>
                    <p className={styles['pages__blocs__item__description']}>
                        {t('landing.content.items.access.subtitle')}
                    </p>
                </div>
            </BlocItem>

            <BlocItem href={translate('navbar.dictionary.link')} icon="Literature">
                <div className={styles['pages__blocs__item']}>
                    <h2 className={styles['pages__blocs__item__title']}>
                        {t('landing.content.items.dictionary.title')}
                    </h2>
                    <p className={styles['pages__blocs__item__description']}>
                        {t('landing.content.items.dictionary.subtitle')}
                    </p>
                </div>
            </BlocItem>
        </div>
    </>
);
export default Home;
