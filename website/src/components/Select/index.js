import React from 'react';
import BaseSelect from 'react-select';

const styleObject = {
    control: (styles) => ({
        ...styles,
        ':hover': {
            borderColor: '#31BDF2',
            cursor: 'pointer',
        },
        fontSize: '14px',
        height: '24px',
        lineHeight: '22px',
        minHeight: '24px',
    }),
    dropdownIndicator: (styles) => ({
        ...styles,
        padding: '0 8px',
    }),
    indicatorSeparator: () => {},
    input: (styles) => ({
        ...styles,
        margin: 0,
        padding: 0,
    }),
    menu: (styles) => ({
        ...styles,
        ':hover': {
            cursor: 'pointer',
        },
        border: 'none',
        boxShadow: '0px 2px 8px rgba(13, 102, 159, 0.17)',
    }),
    option: (styles, { isSelected }) => ({
        ...styles,
        ':active': {
            backgroundColor: '#D8E1EB',
        },
        ':hover': {
            backgroundColor: isSelected ? '#D8E1EB' : '#F0F3F8',
            cursor: 'pointer',
        },
        backgroundColor: isSelected ? '#D8E1EB' : '#fff',
        color: '#18486B',
        fontSize: '14px',
        fontWeight: isSelected ? '600' : 'normal',
        lineHeight: '22px',
    }),
    valueContainer: (styles) => ({
        ...styles,
        padding: '0 8px',
    }),
};

const Select = ({ onChange, options, value, ...rest }) => {
    let objValue = options.find((option) => {
        if (option.value === value) return option;
    });

    if (!objValue) {
        objValue = options[0];
    }

    return (
        <BaseSelect
            defaultValue={options[0]}
            onChange={onChange}
            options={options}
            styles={styleObject}
            theme={(theme) => ({
                ...theme,
                borderRadius: 2,
                colors: {
                    ...theme.colors,
                    neutral20: '#B5C6D8',
                    primary: '#31BDF2',
                },
            })}
            value={objValue}
            {...rest}
        />
    );
};

export default Select;
