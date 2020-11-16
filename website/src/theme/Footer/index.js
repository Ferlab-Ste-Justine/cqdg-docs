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

import React, {useContext} from 'react';

import TranslationContext from '../TranslationContext';
import { t, translate } from '../Utils/translation'

import styles from './styles.module.scss';

function Footer() {
  const { state } = useContext(TranslationContext);

  return (
    <footer className={styles['nav-footer']} id="footer">
      <div className={styles.footerWrapper}>
        <div className={styles.footerTextWrapper}>
          <h3 className={styles.footerTitle}>{t('landing.footer.title')}</h3>
          <p className={styles.footerMoreInfo}>{t('landing.footer.info')} <a className={styles.footerMoreInfoLink} href="mailto:support@cqdg.ca">support@cqdg.ca</a></p>
        </div>
        <div>
          <a href={translate(state.locale, 'landing.footer.logo.genome.link')} target="_blank">
            <img src={`/img/icons/genome_qc_logo_RS.svg`} alt="genome" />
          </a>
          <a href={translate(state.locale, 'landing.footer.logo.chusj.link')} target="_blank" className={styles.footerChuJSLogoLink}>
            <img src={`/img/icons/chusj-logo-color.svg`} alt="chusj" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
