import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

import { ChangeType } from '../types';

/**
 *
 * @param schemas
 * @param diffs
 * Add diffs to schemas
 * Updated fields will be present already
 * Deleted fields will be present
 * Created fields/schemas need to be added explicitly as they have no related field/schema
 */
export const createSchemasWithDiffs = (schemas, diffs) => {
    const diffKeys = Object.keys(diffs);
    const { createdSchemas, deletedSchemas, updatedSchemas } = diffKeys.reduce(
        (acc, schemaName) => {
            const schema = diffs[schemaName];
            const { created, deleted, updated } = schema;
            const currentSchema = { ...schema, name: schemaName };

            // updated schema may have deleted and created fields too
            if (!isEmpty(updated)) {
                return {
                    ...acc,
                    updatedSchemas: acc.updatedSchemas.concat({
                        ...currentSchema,
                        changeType: ChangeType.UPDATED,
                    }),
                };
            } else if (!isEmpty(deleted) && isEmpty(updated) && isEmpty(created)) {
                return {
                    ...acc,
                    deletedSchemas: acc.deletedSchemas.concat({
                        ...currentSchema,
                        changeType: ChangeType.DELETED,
                    }),
                };
            } else if (!isEmpty(created) && isEmpty(updated) && isEmpty(deleted)) {
                return {
                    ...acc,
                    createdSchemas: acc.createdSchemas.concat({
                        ...currentSchema,
                        changeType: ChangeType.CREATED,
                    }),
                };
            }
            return acc;
        },
        { createdSchemas: [], deletedSchemas: [], updatedSchemas: [] }
    );

    const schemasWithUpdates = updatedSchemas.map((schemaDiff) => {
        const schema = schemas.find((schema) => schema.name === schemaDiff.name);
        const { created, updated } = schemaDiff;
        // add diffs to existing fields
        const fieldsWithDiffs = schema.fields.map((field) => {
            const fieldName = field.name;
            const updatedField = updated[fieldName];
            const createdField = created[fieldName];

            // add diff fields for updated (need left and right data)
            const diff = updatedField ? updatedField : null;

            // add changetype
            const changeType = updatedField ? ChangeType.UPDATED : createdField ? ChangeType.CREATED : ChangeType.NONE;

            return { ...field, changeType, diff };
        });

        // deleted fields won't exist already, add them
        const newFields = Object.keys(schemaDiff.deleted).map((key) => ({
            ...schemaDiff.deleted[key],
            changeType: ChangeType.DELETED,
        }));

        // join all modified fields
        const fields = [...fieldsWithDiffs, ...newFields];

        // schema with diffs
        return { ...schema, fields };
    });

    // add created and deleted schemas, add changeType field
    const schemasToAdd = [...createdSchemas, ...deletedSchemas].map((schema) => {
        const allFields = { ...schema.created, ...schema.deleted };
        const fields = Object.keys(allFields).map((f) => allFields[f]);

        return {
            changeType: schema.changeType,
            description: schema.description || '',
            fields,
            name: schema.name,
        };
    });

    const modifiedSchemas = [...schemasWithUpdates, ...schemasToAdd];
    return modifiedSchemas;
};

async function fetchDictionary(version, locale = 'fr') {
    try {
        const dict = await axios.get(`/data/schemas/${locale}/${version}.json`);

        return { dict: dict.data, tree: null };
    } catch (e) {
        throw e;
    }
}

async function fetchDiff(version, diffVersion, locale = 'fr') {
    try {
        const response = await axios.get(
            `/data/schemas/${locale}/diffs/${diffVersion}/${diffVersion}-diff-${version}.json`
        );
        return response.data;
    } catch (e) {
        console.error('fetchDiff failed: ', e);
        return null;
    }
}

/**
 *
 * @param {string} version
 * @param {{data: Dictionary, version: string}} preloadedDictionary
 */
export const getDictionary = async (version) => {
    const { dict } = await fetchDictionary(version);
    return dict ? dict : [];
};

/**
 * @param {string} version
 * @param {string} diffVersion
 */
export const getDictionaryDiff = async (version, diffVersion) => await fetchDiff(version, diffVersion);
