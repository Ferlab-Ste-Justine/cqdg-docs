![](https://github.com/Ferlab-Ste-Justine/cqdg-docs/workflows/Build/badge.svg)
![](https://github.com/Ferlab-Ste-Justine/cqdg-docs/workflows/Publish/badge.svg)


# ICGC-ARGO Doc Site

User documentation for the CQDG Portal.

## Visit Site

[CQDG Portal - User Documentation](https://docs.qa.cqdg.ferlab.bio/)

## Contents

This docs site has been generated using [Docusaurus](https://v2.docusaurus.io/).

Documentation is written in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and can be found in [/docs](docs).

The website, including the docusaurus library, custom pages and components, and all styling is kept in [/website](website).

## Dependencies

To run the docs site requires:

- NodeJS version 12+
  - This is done best using nvm (node version manager). A good summary of this process can be found here for your reference: https://gist.github.com/d2s/372b5943bce17b964a79

## Contributing

To contribute to the docs:

1. Clone the repository to your machine:

```
git clone git@github.com:Ferlab-Ste-Justine/cqdg-docs.git
```

2. Move into the website directory ...

```
cd cqdg-docs/website
```

...and install dependencies via yarn:

```
yarn
```

or NPM
```
npm install
```

3. Run the development server to see your edits live in the browser:

```
yarn start
npm start
```

The site should open in a new page in your browser at the address: [localhost:3000](http://localhost:3000)

4. Edit the markdown files in [/docs](docs)! The content in the browser will update whenever you save the file.

   For other changes to the site, see the extended editing guide in [/website](website):

   - add new documentation pages
   - modify the links in the Header or Footer
   - update the sidebar links

## Updating Dictionary Content

The Data Dictionary content is not updated dynamically when the dictionary is updated. Instead, the dictionary content is included as static files included in this repository. This allows the docs site to be completely static and not have to load the dictionary from the source everytime it is requested.

To simplify updating the dictonary content, the process has been scripted so it can be run by following the commands below.

**Note: By default this connects with the production version of Lectern.**

1. From the cqdg-docs root directory:

```
cd scripts
```

2. Install script dependencies:

```
yarn
```

3. Run the 'Add Dictionary' script:

```
export export LECTERN_USERNAME= ...
export export LECTERN_PASSWORD= ...
yarn run add
```

4. Follow the prompts in the script - Use keyboard arrow keys to highlight the version you want to add. Hit enter when you have selected the desired version.

5. The script has added files in the following places:

   - /website/static/data/schemas/{{version number}}
   - /website/static/data/schemas/diffs/{{version number}}

   And modified the following files:

   - /website/static/data/schemas/schema-versions.json
   - /website/src/pages/dictionary/data.json

   Commit all these added and modified files to git. The following command will work from the argo-docs root directory:

   ```
   git add ./website/static/data/schemas/ ./website/src/pages/dictionary/data.json

   git commit
   ```