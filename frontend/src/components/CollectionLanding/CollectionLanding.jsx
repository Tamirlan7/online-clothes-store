import React from 'react';
import c from './CollectionLanding.module.scss'

const CollectionLanding = ({ overlayText, overlayImageSrc, logoSrc }) => {
    return (
        <div className={c.block}>
            <video autoPlay loop muted className={c.bg}>
                <source src={overlayImageSrc} type={'video/mp4'}/>
            </video>

            <div className={c.content}>
                <img
                    className={c.logo}
                    src={logoSrc}
                    alt='logo'
                />
                <p className={c.text}>{overlayText}</p>
            </div>
        </div>
    );
}

export default CollectionLanding;