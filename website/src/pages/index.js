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
import Search from '../components/LandingSearch';
import BlocItem from '../components/BlocItem';


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
          <div className={styles['pages__splash__content__title']}>
            Centre de Documentation
          </div>
          <div className={styles['pages__splash__content__description']}>
            Trouver de la documentation concernant les différents services du CQDG incluant
            l’accès, la soumission et l’analyse de données cliniques et moléculaires.
          </div>
          <div className={styles['pages__splash__content__search']}>
            <Search></Search>
            <button className={styles['pages__splash__content__search__button']} onClick={() => { }}>Rechercher</button>
          </div>
          <div className={styles['pages__splash__content__link']}>

            <div className={styles["pages__splash__content__link__text"]}>
              Accès au portail

              <div className={styles["pages__splash__content__link__text__underline"]}>

              </div>
            </div>

            <OpenNew />
          </div>
        </SplashContent>
        <PillsBackground height="489px" />
      </div>
      <div className={styles['pages__blocs']}>

        <BlocItem onClick={() => { }}>
          <div className={styles["pages__blocs__item"]}>
            <img src="/img/body/cloud_base.svg"></img>
            <div className={styles["pages__blocs__item__title"]}>
              Soumettre des données
            </div>
            <div className={styles["pages__blocs__item__description"]}>
              Guide pour la soumission de données génomiques
            </div>
          </div>
        </BlocItem>

        <BlocItem>
          <div className={styles["pages__blocs__item"]}>
            <img src="/img/body/genetic_engineering.svg"></img>
            <div className={styles["pages__blocs__item__title"]}>
              Accès aux données
            </div>
            <div className={styles["pages__blocs__item__description"]}>
              Apprenez à accéder et télécharger des données
            </div>
          </div>
        </BlocItem>

        <BlocItem>
          <div className={styles["pages__blocs__item"]}>
            <img src="/img/body/scientific_literature.svg"></img>
            <div className={styles["pages__blocs__item__title"]}>
              Dictionnaire des données
            </div>
            <div className={styles["pages__blocs__item__description"]}>
              Normes pour le formatage des fichiers de données cliniques
            </div>
          </div>
        </BlocItem>
      </div>
    </Layout>
  );
}

export default Index;
