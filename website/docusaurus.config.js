/** @type {import('@docusaurus/types').DocusaurusConfig} */
const path = require('path');
module.exports = {
  title: 'CQDG Docs',
  url: 'https://docs.qa.cqdg.ferlab.bio',
  baseUrl: '/',
  organizationName: 'CQDG',
  projectName: 'cqdg-documentation',
  favicon: 'favicon.ico',
  tagline: 'CQDG Docs',
  stylesheets: ['https://fonts.googleapis.com/css?family=Source+Code+Pro|Work+Sans&display=swap'],
  onBrokenMarkdownLinks: 'warn',

  plugins: [
    'docusaurus-plugin-sass',
    [
      'docusaurus2-dotenv',
      {
        systemvars: true,
      }
    ]
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css'), // Don't use Array, put more CSS in 'stylesheets' above
        },
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
      },
    ],
  ],

  themeConfig: {
    prism: {
      /**
       * if you change the theme, you will need to change the highlighted theme for the code block
       * default theme is Palenight*/
      // theme: require('prism-react-renderer/themes/dracula'),
    },
    colorMode: {
      disableSwitch: true,
    },

    footer: {
      logo: {},
      copyright: `© ${new Date().getFullYear()} CQDG. All Rights reserved.`,
    },
  },
  customFields: {
    PLATFORM_UI_ROOT: 'https://portal.qa.cqdg.ferlab.bio/',
    GATEWAY_API_ROOT: '',
  },
};
