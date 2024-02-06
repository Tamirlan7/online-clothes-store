import React from 'react';
import c from './Popup.module.scss'

function Popup({className, isActive, setIsActive, children, ...props}) {
    return (
        <div {...props} className={`${c.block} ${className}`}>
            {children}
        </div>
    );
}

export default Popup;