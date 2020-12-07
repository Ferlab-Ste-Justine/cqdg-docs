import React from 'react';
import styles from './styles.module.scss';
import PillsBackground from '../../components/PillsBackground';
import OpenNew from '../../components/OpenNew';
import { Search, SearchButton } from '../../components/LandingSearch';
import BlocItem from '../../components/BlocItem';
import { t, translate } from '../Utils/translation';

const SplashContent = (props) => {
  return (
    <div className={props.className}>{props.children}</div>
  )
}

const Home = () => (
    <>
      <div className={styles['pages__splash']}>
        <SplashContent className={styles['pages__splash__content']} >
          <h1 className={styles['pages__splash__content__title']}>
            {t('landing.header.title')}
          </h1>
          <p className={styles['pages__splash__content__description']}>
            {t('landing.header.subtitle')}
          </p>
          <p className={styles['pages__splash__content__search']}>
            <Search></Search>
            <SearchButton >
              {t('landing.header.search.button')}
            </SearchButton>
          </p>
          <div className={styles['pages__splash__content__link']}>

            <a target="_blank" href="https://portal.qa.cqdg.ferlab.bio/" className={styles["pages__splash__content__link__text"]}>
              {t('landing.header.to_portal')}
            </a>

            <OpenNew />
          </div>
        </SplashContent>
        <PillsBackground height="489px" />
      </div>
      <div className={styles['pages__blocs']}>

        <BlocItem href={translate('navbar.submit.link')} icon="Cloud">
          <div className={styles["pages__blocs__item"]}>
            <h2 className={styles["pages__blocs__item__title"]}>
              {t("landing.content.items.submit.title")}
            </h2>
            <p className={styles["pages__blocs__item__description"]}>
              {t("landing.content.items.submit.subtitle")}
            </p>
          </div>
        </BlocItem>

        <BlocItem href={translate('navbar.access.link')} icon="Genetic">
          <div className={styles["pages__blocs__item"]}>
            <h2 className={styles["pages__blocs__item__title"]}>
              {t("landing.content.items.access.title")}
            </h2>
            <p className={styles["pages__blocs__item__description"]}>
              {t("landing.content.items.access.subtitle")}
            </p>
          </div>
        </BlocItem>

        <BlocItem href="/dictionary" icon="Literature">
          <div className={styles["pages__blocs__item"]}>
            <h2 className={styles["pages__blocs__item__title"]}>
              {t("landing.content.items.dictionary.title")}
            </h2>
            <p className={styles["pages__blocs__item__description"]}>
              {t("landing.content.items.dictionary.subtitle")}
            </p>
          </div>
        </BlocItem>
      </div>
    </>
  );
export default Home;