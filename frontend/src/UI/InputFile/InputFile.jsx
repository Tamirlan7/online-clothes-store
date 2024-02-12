import React from 'react';
import c from './InputFile.module.scss'

function InputFile({ label, className, ...props }) {
    return (
        <label className={`${c.label} ${className}`}>
            {label ?? 'Выберите файл'}
            <input className={c.input} type="file" {...props} />
        </label>
    );
}

export default InputFile;