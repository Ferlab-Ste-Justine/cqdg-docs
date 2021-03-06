/** @type {import('@docusaurus/types').DocusaurusConfig} */
const path = require('path');
module.exports = {
    baseUrl: '/',
    customFields: {
        GATEWAY_API_ROOT: '',
        PLATFORM_UI_ROOT: 'https://portal.qa.cqdg.ferlab.bio/',
    },
    favicon: 'favicon.ico',
    i18n: {
        defaultLocale: 'fr',
        locales: ['fr', 'en'],
    },
    onBrokenMarkdownLinks: 'warn',
    organizationName: 'CQDG',
    plugins: [
        require.resolve('docusaurus-plugin-sass'),
        [
            require.resolve('docusaurus2-dotenv'),
            {
                systemvars: true,
            },
        ],
    ],
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'), // Don't use Array, put more CSS in 'stylesheets' above
                },
            },
        ],
    ],
    projectName: 'cqdg-documentation',
    stylesheets: ['https://fonts.googleapis.com/css?family=Source+Code+Pro|Work+Sans&display=swap'],
    tagline: 'CQDG Docs',
    themeConfig: {
        colorMode: {
            disableSwitch: true,
        },
        footer: {
            copyright: `© ${new Date().getFullYear()} CQDG. All Rights reserved.`,
            logo: {},
        },

        prism: {
            /**
             * if you change the theme, you will need to change the highlighted theme for the code block
             * default theme is Palenight*/
            // theme: require('prism-react-renderer/themes/dracula'),
        },
    },
    title: 'CQDG Docs',
    url: 'https://docs.qa.cqdg.ferlab.bio',
};
