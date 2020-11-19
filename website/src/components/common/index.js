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

import React from 'react';
import Tooltip from '@icgc-argo/uikit/Tooltip';

import styles from './common.module.scss';

export const DownloadIcon = ({ disabled }) => {
  const disableModifier = disabled ? '--disabled' : '';

  return (
    <svg className={styles['downloadIcon' + disableModifier]} width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.91387 9.03711C6.9241 9.05018 6.93717 9.06075 6.95209 9.06803C6.96702 9.0753 6.9834 9.07907 7 9.07907C7.0166 9.07907 7.03298 9.0753 7.04791 9.06803C7.06283 9.06075 7.0759 9.05018 7.08613 9.03711L8.61738 7.0998C8.67344 7.02871 8.62285 6.92344 8.53125 6.92344H7.51816V2.29688C7.51816 2.23672 7.46895 2.1875 7.40879 2.1875H6.58848C6.52832 2.1875 6.4791 2.23672 6.4791 2.29688V6.92207H5.46875C5.37715 6.92207 5.32656 7.02734 5.38262 7.09844L6.91387 9.03711ZM12.0039 8.55859H11.1836C11.1234 8.55859 11.0742 8.60781 11.0742 8.66797V10.7734H2.92578V8.66797C2.92578 8.60781 2.87656 8.55859 2.81641 8.55859H1.99609C1.93594 8.55859 1.88672 8.60781 1.88672 8.66797V11.375C1.88672 11.617 2.08223 11.8125 2.32422 11.8125H11.6758C11.9178 11.8125 12.1133 11.617 12.1133 11.375V8.66797C12.1133 8.60781 12.0641 8.55859 12.0039 8.55859Z"/>
    </svg>
  )
};

export const DownloadButtonContent = ({ children, disabled }) => (
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <DownloadIcon disabled={disabled} />
    {children}
  </div>
);

export const DownloadTooltip = ({ children, disabled }) => (
  <Tooltip
    disabled={disabled}
    html={<span>Please select latest schema version to download templates</span>}
  >
    {children}
  </Tooltip>
);

export const Display = ({ children, visible }) => (
  <div style={{ display: visible ? 'block' : 'none' }}>{children}</div>
);
