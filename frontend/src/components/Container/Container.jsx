import React from 'react';
import c from './Container.module.scss'

const Container = ({children, className, ...props}) => {
    return (
        <div
            {...props}
            className={`${c.container} ${className}`}
        >
            {children}
        </div>
    );
}

export default Container;