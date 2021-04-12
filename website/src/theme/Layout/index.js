import React from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Footer from '@theme/Footer';
import LayoutProviders from '@theme/LayoutProviders';
import Navbar from '@theme/Navbar';

import I18NProvider from '../../components/IntlProvider';
// Providers
import TranslationProvider from '../../components/IntlProvider/TranslationContextProvider';

import './styles.css';

const Providers = ({ children }) => (
    <LayoutProviders>
        <TranslationProvider>
            <I18NProvider>{children}</I18NProvider>
        </TranslationProvider>
    </LayoutProviders>
);

function Layout(props) {
    const { siteConfig = {} } = useDocusaurusContext();
    const {
        favicon,
        tagline,
        themeConfig: { image: defaultImage },
        title: defaultTitle,
        url: siteUrl,
    } = siteConfig;
    const { children, description, image, keywords, noFooter, permalink, title, version } = props;
    const metaTitle = title || `${defaultTitle} · ${tagline}`;
    const metaImage = image || defaultImage;
    const metaImageUrl = siteUrl + useBaseUrl(metaImage);
    const faviconUrl = useBaseUrl(favicon);
    return (
        <Providers>
            <Head>
                <meta content="ie=edge" httpEquiv="x-ua-compatible" />
                {metaTitle && <title>{metaTitle}</title>}
                {metaTitle && <meta content={metaTitle} property="og:title" />}
                {favicon && <link href={faviconUrl} rel="shortcut icon" />}
                {description && <meta content={description} name="description" />}
                {description && <meta content={description} property="og:description" />}
                {version && <meta content={version} name="docsearch:version" />}
                {keywords && keywords.length && <meta content={keywords.join(',')} name="keywords" />}
                {metaImage && <meta content={metaImageUrl} property="og:image" />}
                {metaImage && <meta content={metaImageUrl} property="twitter:image" />}
                {metaImage && <meta content={`Image for ${metaTitle}`} name="twitter:image:alt" />}
                {permalink && <meta content={siteUrl + permalink} property="og:url" />}
                <meta content="summary" name="twitter:card" />
            </Head>
            <Navbar />
            <main className="main-wrapper">{children}</main>
            {!noFooter && <Footer />}
        </Providers>
    );
}

export default Layout;
