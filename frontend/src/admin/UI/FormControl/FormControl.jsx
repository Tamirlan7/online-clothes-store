import React from 'react';
import c from './FormControl.module.scss'

function FormControl({ labelText, children }) {
    return (
        <div className={c.control}>
            <label className={c.label}>{labelText}</label>
            <div>
                {children}
            </div>
        </div>
    );
}

export default FormControl;