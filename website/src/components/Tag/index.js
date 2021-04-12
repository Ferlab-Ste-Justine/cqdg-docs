import React from 'react';
import TagComponent from '@icgc-argo/uikit/Tag';

import styles from './styles.module.css';

export const TAG_TYPES = Object.freeze({
    CONDITIONAL: 'conditional',
    CORE: 'core',
    EXTENDED: 'extended',
    ID: 'id',
    REQUIRED: 'required',
});

export const TAG_DISPLAY_NAME = Object.freeze({
    conditional: 'Conditional',
    core: 'Core',
    extended: 'Extended',
    id: 'ID',
    required: 'Required',
});

const Tag = ({ type }) => {
    switch (type) {
        case TAG_TYPES.REQUIRED:
            return <TagComponent className={`${styles.tag} ${styles.required}`}>Required</TagComponent>;
        case TAG_TYPES.CONDITIONAL:
            return <TagComponent className={`${styles.tag} ${styles.conditional}`}>Conditional</TagComponent>;
        case TAG_TYPES.CORE:
            return <TagComponent className={`${styles.tag} ${styles.core}`}>Core</TagComponent>;
        case TAG_TYPES.ID:
            return <TagComponent className={`${styles.tag} ${styles.id}`}>ID</TagComponent>;
        case TAG_TYPES.EXTENDED:
            return <TagComponent className={`${styles.tag} ${styles.extended}`}>Extended</TagComponent>;
        default:
            return null;
    }
};

export default Tag;
