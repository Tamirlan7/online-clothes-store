import React from 'react';
import c from './Loader.module.scss'

function Loader({rootClassName, loaderClassName, loading, color}) {
    color = color ?? 'black'
    loading = loading ?? true

    if (!loading) {
        return <></>
    }

    if (color === 'white') {
        return (
            <div className={`${c['white-wrapper']} ${c.wrapper} ${rootClassName}`}>
                <div className={`${c['white-loader']} ${loaderClassName} ${c.loader}`}></div>
            </div>
        )
    }

    return (
        <div className={`${c.wrapper} ${rootClassName}`}>
            <div className={`${loaderClassName} ${c.loader}`}></div>
        </div>
    );
}


export default Loader;