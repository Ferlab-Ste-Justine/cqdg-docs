const schemasAvailable = require('../static/data/schemas/schema-versions.json');

export const getLatestVersion = () => schemasAvailable.sort().slice(-1)[0];

export const CQDG_PORTAL_URL = process.env.CQDG_PORTAL_URL || 'https://portail.cqdg.ca';

export const isSearchAvailable =
    !process.env.ALGOLIA_API_KEY || !process.env.ALGOLIA_INDEX || !process.env.ALGOLIA_APP_ID ? false : true;
