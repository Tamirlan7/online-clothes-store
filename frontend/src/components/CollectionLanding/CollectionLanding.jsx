import React from 'react';
import './CollectionLanding.scss'

const CollectionLanding = ({ overlayText, overlayImageSrc, logoSrc }) => {
    return (
        <div className='drop__top-container'>
            <img
                className='drop__img'
                src={overlayImageSrc}
                alt='animated muted video'
            />
            <div className='drop__overlay'>
                <img
                    className='drop__overlay-logo'
                    src={logoSrc}
                    alt='logo'
                />
                <p className='drop__overlay-text'>{overlayText}</p>
            </div>
        </div>
    );
}

export default CollectionLanding;