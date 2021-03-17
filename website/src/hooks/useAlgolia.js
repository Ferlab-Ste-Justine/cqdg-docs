import { useHistory } from '@docusaurus/router';

import { isSearchAvailable } from '../utils';
/**
 * Expects id selector for input
 */
const useAlgolia = (inputRef, lang = 'en', options = {}) => {
    const history = useHistory();

    if (!isSearchAvailable) {
        console.warn('Search not configured');
        return false;
    } else {
        // lazy load because docsearch module isn't SSR friendly
        import('docsearch.js')
            .then(({ default: docsearch }) => {
                docsearch({
                    algoliaOptions: options,

                    apiKey: process.env.ALGOLIA_API_KEY,
                    // debug: true,
                    appId: process.env.ALGOLIA_APP_ID,
                    // Override algolia's default selection event, allowing us to do client-side
                    // navigation and avoiding a full page refresh.
                    handleSelected: (_input, _event, suggestion) => {
                        // Use an anchor tag to parse the absolute url into a relative url
                        // Alternatively, we can use new URL(suggestion.url) but its not supported in IE
                        const a = document.createElement('a');
                        a.href = suggestion.url;

                        // Algolia use closest parent element id #__docusaurus when a h1 page title does not have an id
                        // So, we can safely remove it. See https://github.com/facebook/docusaurus/issues/1828 for more details.
                        const routePath = `#__docusaurus` === a.hash ? `${a.pathname}` : `${a.pathname}${a.hash}`;
                        history.push(routePath);
                    },

                    indexName: `${process.env.ALGOLIA_INDEX}_${lang}`,

                    inputSelector: `#${inputRef.current.id}`,
                });
            })
            .catch((e) => {
                console.warn('Search not available');
                return false;
            });
    }
};

export default useAlgolia;
