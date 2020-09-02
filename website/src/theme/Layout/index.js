/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';

// Providers
import TranslationProvider from '../TranslationContextProvider';
import I18NProvider from '../IntlProvider/index';

import './styles.css';


function Providers({ children }) {
  return (
    <TranslationProvider>
      <I18NProvider>
        {children}
      </I18NProvider>
    </TranslationProvider>
  )
}

function Layout(props) {
  const { siteConfig = {} } = useDocusaurusContext();
  const {
    favicon,
    tagline,
    title: defaultTitle,
    themeConfig: { image: defaultImage },
    url: siteUrl,
  } = siteConfig;
  const {
    children,
    title,
    noFooter,
    description,
    image,
    keywords,
    permalink,
    version,
  } = props;
  const metaTitle = title || `${defaultTitle} · ${tagline}`;
  const metaImage = image || defaultImage;
  const metaImageUrl = siteUrl + useBaseUrl(metaImage);
  const faviconUrl = useBaseUrl(favicon);
  return (
    <>
      <Providers>
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          {metaTitle && <title>{metaTitle}</title>}
          {metaTitle && <meta property="og:title" content={metaTitle} />}
          {favicon && <link rel="shortcut icon" href={faviconUrl} />}
          {description && <meta name="description" content={description} />}
          {description && (
            <meta property="og:description" content={description} />
          )}
          {version && <meta name="docsearch:version" content={version} />}
          {keywords && keywords.length && (
            <meta name="keywords" content={keywords.join(',')} />
          )}
          {metaImage && <meta property="og:image" content={metaImageUrl} />}
          {metaImage && <meta property="twitter:image" content={metaImageUrl} />}
          {metaImage && (
            <meta name="twitter:image:alt" content={`Image for ${metaTitle}`} />
          )}
          {permalink && <meta property="og:url" content={siteUrl + permalink} />}
          <meta name="twitter:card" content="summary" />
        </Head>
        <Navbar />
        <main className="main-wrapper">{children}</main>
        {!noFooter && <Footer />}
      </Providers>
    </>
  );
}

export default Layout;
