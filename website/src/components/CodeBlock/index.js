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
import Highlight, { defaultProps } from 'prism-react-renderer';
import defaultTheme from 'prism-react-renderer/themes/palenight';
import styles from './styles.module.css';

/**
 * Based off @theme/Codeblock
 */

const CodeBlock = ({ codes, className }) => {
  return (
    <div className={className}>
      {codes ? codes.map(code => (
        <div className={styles.highlightContainer}>
          <Highlight {...defaultProps} code={code} language="js" theme={defaultTheme}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} ${styles.code}`} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      )) : <div>No code!</div>}
    </div>
  );
};

export const CompareCodeBlock = ({ left, right }) => (
  <div className={styles.compareBlockContainer}>
    <CodeBlock
      codes={left}
      className={styles.compareBlock}
    />
    <CodeBlock codes={right} prismTheme={defaultTheme} />
  </div>
);

export default CodeBlock;
