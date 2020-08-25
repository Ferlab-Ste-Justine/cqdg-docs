/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY                           
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES                          
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT                           
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,                                
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED                          
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;                               
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER                              
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN                         
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *  
 *
 */

const React = require('react');

import Layout from '@theme/Layout';
import styles from './styles.module.scss';
import PillsBackground from '../components/PillsBackground';
import OpenNew from '../components/OpenNew';
import { Search, SearchButton } from '../components/LandingSearch';
import BlocItem from '../components/BlocItem';
import { t } from '../theme/Utils/translation';


const SplashContent = (props) => {
  return (
    <div className={props.className}>{props.children}</div>
  )
}


function Index() {
  return (
    <Layout permalink="/" title="ICGC ARGO Docs">
      <div className={styles['pages__splash']}>
        <SplashContent className={styles['pages__splash__content']} >
          <h2 className={styles['pages__splash__content__title']}>
            {t('landing.header.title')}
          </h2>
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

            <a href="" className={styles["pages__splash__content__link__text"]}>
              {t('landing.header.to_portal')}
            </a>

            <OpenNew />
          </div>
        </SplashContent>
        <PillsBackground height="489px" />
      </div>
      <div className={styles['pages__blocs']}>

        <BlocItem onClick={() => { }} icon="Cloud">
          <div className={styles["pages__blocs__item"]}>
            <h2 className={styles["pages__blocs__item__title"]}>
              {t("landing.content.items.submit.title")}
            </h2>
            <p className={styles["pages__blocs__item__description"]}>
              {t("landing.content.items.submit.subtitle")}
            </p>
          </div>
        </BlocItem>

        <BlocItem icon="Genetic">
          <div className={styles["pages__blocs__item"]}>
            <h2 className={styles["pages__blocs__item__title"]}>
              {t("landing.content.items.access.title")}
            </h2>
            <p className={styles["pages__blocs__item__description"]}>
              {t("landing.content.items.access.subtitle")}
            </p>
          </div>
        </BlocItem>

        <BlocItem icon="Literature">
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
    </Layout>
  );
}

export default Index;
