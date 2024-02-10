import React from 'react';
import c from './Loader.module.scss'

function Loader() {
    return (
        <div className={c.wrapper}>
            <div className={c.loader}></div>
        </div>
    );
}


export default Loader;