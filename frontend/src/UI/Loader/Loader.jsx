import React from 'react';
import c from './Loader.module.scss'

function Loader({rootClassName, loaderClassName, loading}) {
    loading = loading ?? true

    if (!loading) {
        return <></>
    }


    return (
        <div className={`${c.wrapper} ${rootClassName}`}>
            <div className={`${loaderClassName} ${c.loader}`}></div>
        </div>
    );
}


export default Loader;