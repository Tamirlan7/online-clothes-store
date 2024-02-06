import React from 'react';
import c from './Input.module.scss'

function Input({ className, mode, invalid, ...props }) {
    // mode: default || numeric

    function handleOnNumericInputChange(e) {
        let newEvent = e
        newEvent.target.value = newEvent.target.value.match(/\d+/g)?.join('') ?? ''

        if (props.onChange) {
            props.onChange(newEvent)
        }
    }

    if (mode === 'numeric') {
        return (
            <input
                {...props}
                onChange={(e) => handleOnNumericInputChange(e)}
                type={props.type ?? 'text'}
                className={`${c.input} ${className} ${invalid && c.invalid}`}
            />
        );
    }

    return (
        <input
            {...props}
            type={props.type ?? 'text'}
            className={`${c.input} ${className} ${invalid && c.invalid}`}
        />
    );
}

export default Input;