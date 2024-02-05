/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = {
    baseUrl: '/',
    customFields: {
        GATEWAY_API_ROOT: '',
        PLATFORM_UI_ROOT: process.env.CQDG_PORTAL_URL || 'https://portail.cqdg.ca',
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
                theme: {
                    customCss: require.resolve('./src/css/custom.css'), // Don't use Array, put more CSS in 'stylesheets' above
                },
            },
        ],
    ],
    projectName: 'cqdg-dictionary',
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
    url: process.env.CQDG_DOCS_URL || 'https://docs.cqdg.ca',
};
