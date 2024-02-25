import React from 'react';
import c from './AgCollectionPage.module.scss'
import noSignal from '../../assets/videos/banners/no-signal.mp4'

function AgCollectionPage() {
    return (
        <div className={c.wrapper}>
            <video autoPlay loop muted className={c.video}>
                <source src={noSignal} type={'video/mp4'}/>
            </video>
        </div>
    );
}

export default AgCollectionPage;