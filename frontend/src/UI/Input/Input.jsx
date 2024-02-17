import React, {forwardRef} from 'react';
import c from './Input.module.scss'

function Input({className, mode, invalid, focusable = true, hoverable = true, ...props}, ref) {
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
                ref={ref}
                {...props}
                onChange={(e) => handleOnNumericInputChange(e)}
                type={props.type ?? 'text'}
                className={`
                    ${c.input} 
                    ${!focusable && c['not-focusable']} 
                    ${!hoverable && c['not-hoverable']} 
                    ${className} 
                    ${invalid && c.invalid}
                    `}
            />
        );
    }

    return (
        <input
            ref={ref}
            {...props}
            type={props.type ?? 'text'}
            className={`${c.input} ${className} ${invalid && c.invalid}`}
        />
    );
}

export default forwardRef(Input);