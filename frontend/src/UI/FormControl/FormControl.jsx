import React from 'react';
import c from './FormControl.module.scss'

function FormControl({labelText, children, invalid, errorMessage}) {
    return (
        <div className={c.control}>
            {labelText && (
                <label className={c.label}>{labelText}</label>
            )}
            <div className={c.block}>
                {children}
            </div>
            {invalid && (
                <span className={`${c.error}`}>{errorMessage}</span>
            )}
        </div>
    );
}

export default FormControl;