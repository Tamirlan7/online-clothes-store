import React from 'react';
import c from './Container.module.scss'

const Container = ({ children }) => {
    return (
        <div className={c.container}>
            {children}
        </div>
    );
}

export default Container;