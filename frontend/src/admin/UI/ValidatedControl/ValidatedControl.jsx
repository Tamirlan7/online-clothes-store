import React from 'react';
import c from './ValidatedControl.module.scss'

function ValidatedControl({ children, errorMessage, invalid }) {
    return (
        <div className={c.block}>
            <div>
                {children}
            </div>

            {invalid && (
                <div className={c.error}>{errorMessage}</div>
            )}
        </div>
    );
}

export default ValidatedControl;