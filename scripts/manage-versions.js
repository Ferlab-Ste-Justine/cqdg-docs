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
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require('axios');
const chalk = require('chalk');
const inquirer = require('inquirer');
const querystring = require('querystring');
const fs = require('fs');
const argv = require('yargs').argv;
const fse = require('fs-extra');
const generateTreeData = require('./generateData');
const generateDiffChanges = require('./generateDiffData');

const constants = require('./constants');

const apiRoot = 'https://schema.qa.juno.cqdg.ferlab.bio';
//const apiRoot = 'http://localhost:3500';
// const apiRoot = 'https://schema.cqdg.ca';

const defaultVersion = '0.0';

const schemas = require('./dictionary/schemas');
const references = require('./dictionary/references');
const {replace} = require('lodash');

const {
    dictionaryNames,
    schemaPath,
    versionsFilename,
    dataFilename,
    dataFileTreeName,
    languages,
} = constants;
const currentVersions = require(versionsFilename);

/* Util Functions */

function ensureDirectoryExistence(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

function printConfig() {
    console.log(`${chalk.yellow('Lectern Root')}: ${apiRoot}`);
    Object.keys(dictionaryNames).map((language) => {
        console.log(`${chalk.yellow('Dictionary Name')}: ${dictionaryNames[language]}`);
    });
}

async function printVersionsLists() {
    const versions = await fetchDictionaryVersionsList();

    const newVersions = versions.filter((item) => !currentVersions.includes(item));

    console.log(`\n${chalk.yellow('All Versions')}: ${versions.join(', ')}`);
    console.log(`${chalk.yellow('Current Versions')}: ${currentVersions.join(', ')}`);
    console.log(`\n${chalk.yellow('New Versions')}: ${newVersions.join(', ')}`);
    return newVersions;
}

function saveFiles(version, data, language) {
    console.log('version=', version);
    const dataFile = `${schemaPath}/${language}/${version}.json`;
    const treeFile = `${schemaPath}/${language}/${version}_tree.json`;
    fse.writeJSONSync(dataFile, data);
    const treeData = generateTreeData(data);
    fse.writeJSONSync(treeFile, treeData);
}

function saveVersionsFile(data) {
    fs.writeFileSync(versionsFilename, JSON.stringify(data));
}

// The data file is the file used on load in the data dictionary.
function saveDataFiles(dictionary, versions, language) {
    const content = {
        dictionary,
        versions,
        currentVersion: versions[0],
    };
    const fileName = replace(dataFilename, '{language}', language);
    const treeFileName = replace(dataFileTreeName, '{language}', language);
    fs.writeFileSync(fileName, JSON.stringify(content));
    const treeData = generateTreeData(content.dictionary);
    fse.writeJSONSync(treeFileName, treeData);
}

async function fetchAndSaveDiffsForVersion(version, language) {
    for (let i = 0; i < currentVersions.length; i++) {
        const otherVersion = currentVersions[i];

        // Ternary with comparison instead of min/max to avoid removing the decimal when the version has a .0
        const high = parseFloat(version) > parseFloat(otherVersion) ? version : otherVersion;
        const low = parseFloat(version) < parseFloat(otherVersion) ? version : otherVersion;

        const pathHigh = `${schemaPath}/${language}/diffs/${high}`;
        const pathLow = `${schemaPath}/${language}/diffs/${low}`;
        const filenameHL = `${pathHigh}/${high}-diff-${low}.json`;
        const filenameLH = `${pathLow}/${low}-diff-${high}.json`;

        try {
            ensureDirectoryExistence(pathHigh);
            ensureDirectoryExistence(pathLow);
            const schemaDiffHL = await fetchDiffForVersions(dictionaryNames[language], high, low);
            const schemaDiffLH = await fetchDiffForVersions(dictionaryNames[language], low, high);
            const diffHL = generateDiffChanges(schemaDiffHL);
            const diffsLH = generateDiffChanges(schemaDiffLH);

            console.log(
                `${chalk.cyan('saving diff for versions')} ${high} ${chalk.cyan('and')} ${low} ${chalk.cyan(
                    '...',
                )}`,
            );
            fse.writeJSONSync(filenameHL, diffHL);

            console.log(
                `${chalk.cyan('saving diff for versions')} ${low} ${chalk.cyan('and')} ${high} ${chalk.cyan(
                    '...',
                )}`,
            );
            fse.writeJSONSync(filenameLH, diffsLH);
        } catch (e) {
            console.log(
                chalk.red(
                    `Error fetching or saving diff! for dictionary: ${dictionaryNames[language]} and versions ${high} ${low}`,
                ),
                e.response.data.error,
                e.response.data.message,
            );
        }
    }
}

/* Lectern API */

async function fetchDictionaryVersionsList() {
    console.log(chalk.cyan('\nfetching dictionary versions list...'));
    const response = await axios.get(`${apiRoot}/dictionaries`);

    return response.data
        .filter((item) => item.name === dictionaryNames.en)
        .map((item) => item.version)
        .sort((a, b) => (a.version > b.version ? 1 : -1));
}

async function fetchDictionaryForVersion(version, dictionaryName) {
    console.log(`${chalk.cyan('\nfetching dictionary for version')} ${version} ${chalk.cyan('...')}`);

    let url = `${apiRoot}/dictionaries?${querystring.stringify({name: dictionaryName, version})}`;
    try {
        const response = await axios.get(url);
        return response.data[0];
    } catch (e) {
        console.log(chalk.red(`Error fetching dict!!`), e.response.data);
        throw e;
    }
}

async function fetchDiffForVersions(dictionaryName, left, right) {
    console.log(
        `${chalk.cyan(
            `\nfetching dictionary: ${dictionaryName} diff for versions`,
        )} ${left} ${chalk.cyan('vs')} ${right} ${chalk.cyan('...')}`,
    );
    let response = {data: []};
    try {
        response = await axios.get(
            `${apiRoot}/diff?${querystring.stringify({name: dictionaryName, left, right})}`,
        );
    } catch {
        response = await axios.get(
            `${apiRoot}/diff?${querystring.stringify({
                name: dictionaryNames[languages.default],
                left,
                right,
            })}`,
        );

        console.log(
            `${chalk.red(
                `\n ---- Fall back to english dictionary - ${dictionaryName} - ${left} - ${right} ---`,
            )}`,
        );
    }

    return response.data;
}

/* User Prompts */

async function promptUserName() {
    console.log('\n');
    return (
        process.env.LECTERN_USERNAME ||
        new Promise((resolve) =>
            inquirer
                .prompt([
                    {
                        message: `Lectern username :`,
                        name: 'username',
                        type: 'string',
                    },
                ])
                .then((answers) => resolve(answers.username)),
        )
    );
}

async function promptPassword() {
    console.log('\n');
    return (
        process.env.LECTERN_PASSWORD ||
        new Promise((resolve) =>
            inquirer
                .prompt([
                    {
                        message: `Lectern password :`,
                        name: 'password',
                        type: 'password',
                    },
                ])
                .then((answers) => resolve(answers.password)),
        )
    );
}

async function promptVersion() {
    console.log('\n');
    return new Promise((resolve) =>
        inquirer
            .prompt([
                {
                    message: `Dictionary Version [${chalk.yellow(defaultVersion)}]:`,
                    name: 'version',
                    type: 'string',
                },
            ])
            .then((answers) => resolve(answers.version || defaultVersion)),
    );
}

/* SCRIPT MODES */
async function runList() {
    console.log(chalk.green(`Listing all available dictionary versions:`));
    await setLecternCredentials();
    printConfig();
    printVersionsLists();
}

async function postNewDictionary(version, dictionaryName, references, schemas) {
    const dictionary = {name: dictionaryName, version, references, schemas};
    console.log(
        `${chalk.cyan(`\nPosting dictionary : ${dictionaryName} for version`)} ${version} ${chalk.cyan(
            '...',
        )}`,
    );
    try {
        const response = await axios.post(`${apiRoot}/dictionaries`, dictionary);
        return response.data;
    } catch (e) {
        console.log(chalk.red(`Error posting dict!!`), e.response.data);
        throw e;
    }
}

async function validateNewDictionary(version, dictionaryName, references, schemas) {
    const dictionary = {name: dictionaryName, version, references, schemas};
    console.log(
        `${chalk.cyan(
            `\nValidating dictionary : ${dictionaryName} for version`,
        )} ${version} ${chalk.cyan('...')}`,
    );
    try {
        const response = await axios.post(`${apiRoot}/validate`, dictionary);
        return response.data;
    } catch (e) {
        console.log(chalk.red(`Error validating dict!!`), e);
        throw e;
    }
}

async function setLecternCredentials() {
    const username = await promptUserName();
    const password = await promptPassword();
    axios.interceptors.request.use(
        (config) => {
            config.auth = {username: username, password: password};
            return config;
        },
        (error) => {
            Promise.reject(error);
        },
    );
}

async function runValidation() {
    console.log(chalk.green(`Validating your new dictionary version`));
    printConfig();
    await setLecternCredentials();
    // Fetch the dictionary for this version and save data and tree files
    const version = await promptVersion();
    await Promise.all(
        languages.list.map(async (language) => {
            const dictionaryName = dictionaryNames[language];
            const selectedSchemas = schemas[language];
            const selectedReferences = references[language];
            await validateNewDictionary(version, dictionaryName, selectedReferences, selectedSchemas);
        }),
    );

    console.log(chalk.green('\n\nYour dictionary is valid :D'));
}

async function runDiff() {
    console.log(chalk.green(`Lets create diff version base on a specific version`));
    await setLecternCredentials();

    // Fetch the dictionary for this version and save data and tree files
    const version = await promptVersion();

    // Fetch all Diffs and save
    console.log(chalk.cyan('fetching diffs vs stored versions...'));
    if (version === 'all') {
        await Promise.all(
            currentVersions.map(async (version) => {
                await Promise.all(
                    languages.list.map(async (language) => {
                        await fetchAndSaveDiffsForVersion(version, language);
                    }),
                );
            }),
        );
    } else {
        await Promise.all(
            languages.list.map(async (language) => {
                await fetchAndSaveDiffsForVersion(version, language);
            }),
        );
    }

    console.log(chalk.green('\n\nALL CHANGES COMPLETE :D'));
}

async function runAdd() {
    console.log(chalk.green(`Lets add a new dictionary version!`));
    printConfig();
    await setLecternCredentials();
    // Fetch the dictionary for this version and save data and tree files
    const version = await promptVersion();
    await Promise.all(
        languages.list.map(async (language) => {
            const dictionaryName = dictionaryNames[language];
            const selectedSchemas = schemas[language];
            const selectedReferences = references[language];
            await postNewDictionary(version, dictionaryName, selectedReferences, selectedSchemas);
        }),
    );

    // Update versions file
    const updatedVersions = currentVersions.concat(version).sort((v1, v2) => {
        const [v1Major, v1Minor] = v1.split('.').map(Number);
        const [v2Major, v2Minor] = v2.split('.').map(Number);
        if (v2Major === v1Major) {
            return v2Minor - v1Minor;
        } else {
            return v2Major - v1Major;
        }
    });

    await Promise.all(
        languages.list.map(async (language) => {
            const dictionaryName = dictionaryNames[language];
            const dictionary = await fetchDictionaryForVersion(version, dictionaryName);
            saveFiles(version, dictionary, language);

            console.log(chalk.cyan('dictionary saved...'));

            // Fetch all Diffs and save
            console.log(chalk.cyan('fetching diffs vs stored versions...'));
            await fetchAndSaveDiffsForVersion(version, language);

            console.log(chalk.cyan('\nupdating data dictionary input file...'));
            saveDataFiles(dictionary, updatedVersions, language);
        }),
    );

    console.log(chalk.cyan('\nupdating list of data dictionary versions...'));
    saveVersionsFile(updatedVersions);

    console.log(chalk.green('\n\nALL CHANGES COMPLETE :D'));
}

function runHelp() {
    if (argv.npm) {
        console.log(`${chalk.yellow('--=')} Data Dictionary Scripts Help ${chalk.yellow('=--')}\n\n`);
        console.log(
            `${chalk.green(
                'npm run list',
            )} \t- Display list of available dictionary versions from lectern, \n\t\t   along with list of all versions that are not yet downloaded to the Data Dictionary.`,
        );
        console.log(
            `${chalk.green(
                'npm run add',
            )} \t- Select a dictionary version to add to the data dictionary.`,
        );
        console.log(
            `${chalk.green(
                'npm run validate',
            )} \t- Validate a dictionary version to make sure it can be added to the data dictionary.`,
        );
        console.log(
            `${chalk.green(
                'npm run diff',
            )} \t- Recreate all the diff files with a specific version or with all the versions (pass 'all' to the version number)`,
        );
        console.log('\n');
    } else {
        console.log(`NODE HELP MENU`);
        console.log('\n');
    }
}

function run() {
    if (argv.l || argv.list) {
        // LIST ALL VERSIONS
        runList();
    } else if (argv.d || argv.diff) {
        // CREATE DIFF BETWEEN VERSION FOR ALL OR PRECISE VERSION
        runDiff();
    } else if (argv.a || argv.add) {
        // ADD A NEW VERSION (first list all to show, then query the add)
        runAdd();
    } else if (argv.v || argv.validate) {
        // Simulation
        runValidation();
    } else {
        // HELP MENU
        runHelp();
    }
}

// MAIN!
run();
