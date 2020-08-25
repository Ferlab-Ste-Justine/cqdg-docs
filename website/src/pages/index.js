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
import styles from './styles.module.css';
import AlgoliaSearch from '../components/AlgoliaSearch';

function HomeSplash() {
  const SplashContainer = props => (
    <div className={styles.homeContainer}>
      <div className={styles.homeSplashFade}>
        <div className={styles.homeWrapper}>{props.children}</div>
      </div>
    </div>
  );

  const SearchBanner = props => (
    <section className={styles.searchBanner}>
      <span className={styles.bannerText}>Informez-vous!</span>
      <AlgoliaSearch />
    </section>
  );

  return (
    <SplashContainer>
      <SearchBanner />
    </SplashContainer>
  );
}

class ContentBlock extends React.Component {
  render() {
    const { color, title, icon } = this.props;
    return (
      <div className={styles.contentBlock} style={{ borderColor: color }}>
        <div className={styles.contentBlockHeader}>
          <span className={styles.contentBlockTitle}>{title}</span>
          <img src={icon} height={50} />
        </div>
        <div className={styles.contentBlockInner}>{this.props.children}</div>
      </div>
    );
  }
}

function Index() {
  return (
    <Layout permalink="/" title="ICGC ARGO Docs">
      <div>
        <HomeSplash />
        <div className={styles.mainContainer}>
          <div className={styles.row}>
            <ContentBlock
              title="Dictionnaire de données"
              color="#4bcee5"
              icon="img/icons/home/data-dictionary.svg"
            >
              <span className={styles.contentDescription}>
                Le dictionaire de données décrit les normes pour le formatage des données cliniques soumises au CQDG.
              </span>
              <a className={styles.contentAction} href="/dictionary">
                Visionneur du dictionnaire
                <img src="img/icons/chevron-right.svg" height={8} width={8} />
              </a>
            </ContentBlock>
            <ContentBlock
              title="Soumission des données"
              color="#24dbb4"
              icon="img/icons/home/testtube.svg"
            >
              <span className={styles.contentDescription}>
                Guide pour la soumission de données cliniques et génomiques.
              </span>
              <a className={styles.contentAction} href="/docs/submission/submitting-clinical-data">
                Comment soumettre vos données
                <img src="img/icons/chevron-right.svg" height={8} width={8} />
              </a>
            </ContentBlock>
          </div>
          <div className={styles.row}>
            <ContentBlock
              title="Accès et téléchargement des données"
              color="#f95d31"
              icon="img/icons/home/download.svg"
            >
              <span className={styles.contentDescription}>
                Guide pour l'accès aux données contrôlées du CQDG
              </span>
              <li>
                <a className={styles.contentAction} href="/docs/data-access/data-access">
                  Comment accéder aux données
                <img src="img/icons/chevron-right.svg" height={8} width={8} />
                </a>
              </li>
              <li>
                <a className={styles.contentAction} href="/docs/data-access/data-download">
                  Comment télécharger des données
                <img src="img/icons/chevron-right.svg" height={8} width={8} />
                </a>
              </li>
              <li>
              </li>
            </ContentBlock>
            <ContentBlock
              title="Citation des sources de données"
              color="#E75471"
              icon="img/icons/home/publication-guidelines.svg"
            >
              <span className={styles.contentDescription}>
                Comment citer la plateformne CQDG et les données utilisées dans vos publications.
              </span>
              <a className={styles.contentAction} href="/docs/data-access/publication-guidelines">
                Lire
                <img src="img/icons/chevron-right.svg" height={8} width={8} />
              </a>
            </ContentBlock>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
