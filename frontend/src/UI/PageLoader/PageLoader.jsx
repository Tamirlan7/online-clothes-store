import React from 'react';
import loader from "../../assets/videos/loader/loader.gif";
import c from './PageLoader.module.scss'


function PageLoader() {
    return (
        <div className={c.block}>
            <img src={loader} alt="loader"/>
        </div>
    );
}

export default PageLoader;