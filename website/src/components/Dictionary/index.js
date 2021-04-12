import React from 'react';
import find from 'lodash/find';
import startCase from 'lodash/startCase';

import Schema from '../Schema';

const Dictionary = ({ isDiffShowing, isLatestSchema, menuContents, schemas }) =>
    schemas.length > 0 ? (
        schemas.map((schema) => {
            const menuItem = find(menuContents, { name: startCase(schema.name) });

            return (
                <Schema
                    isDiffShowing={isDiffShowing}
                    isLatestSchema={isLatestSchema}
                    key={schema.name}
                    menuItem={menuItem}
                    schema={schema}
                />
            );
        })
    ) : (
        <div>No results found</div>
    );

export default Dictionary;
