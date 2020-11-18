import React from 'react'
import BaseSelect from 'react-select'

const styleObject  = {
    control: styles => ({...styles, 
        height: '24px',
        minHeight: '24px',
        fontSize: '14px',
        lineHeight: '22px',
        ':hover': {
            cursor: 'pointer',
            borderColor: '#31BDF2',
        },
    }),
    input: (styles) => ({
        ...styles,
        margin: 0,
        padding: 0
    }),
    valueContainer: styles => ({
        ...styles,
        padding: '0 8px'
    }),
    menu: styles => ({...styles, 
        border: 'none',
        boxShadow: '0px 2px 8px rgba(13, 102, 159, 0.17)',
        ':hover': {
            cursor: 'pointer',
        },
    }),
    option: (styles, { isSelected }) => ({
        ...styles,
        fontSize: '14px',
        lineHeight: '22px',
        color: '#18486B',
        fontWeight: (isSelected ?  '600': 'normal'),
        backgroundColor: (isSelected ?  '#D8E1EB': '#fff'),
        ':hover': {
            cursor: 'pointer',
            backgroundColor: isSelected ? '#D8E1EB': '#F0F3F8'
        },
        ':active': {
            backgroundColor: '#D8E1EB',
        },
    }),
    dropdownIndicator: styles => ({
        ...styles,
        padding: '0 8px'
    }),
    indicatorSeparator: () => {}
}

const Select = ({options, value, onChange, ...rest}) => {
    let objValue = options.find(option => {
        if (option.value === value) return option;
    });
    
    if (!objValue) {
        objValue = options[0];
    }

    return (
        <BaseSelect
            theme={theme => ({
                ...theme,
                borderRadius: 2,
                colors: {
                    ...theme.colors,
                    primary: '#31BDF2',
                    neutral20: '#B5C6D8'
                }            
            })} 
            styles={styleObject} 
            options={options} 
            defaultValue={options[0]} 
            value={objValue} 
            onChange={onChange} 
            {...rest} 
        /> 
    )
} 

export default Select;
