import React from 'react';
import c from './AgCollectionPage.module.scss'
import noSignal from '../../assets/videos/banners/no-signal.mp4'

function AgCollectionPage() {
    return (
        <div className={c.wrapper}>
            <video playsInline autoPlay loop muted className={c.video}>
                <source src={noSignal} type={'video/mp4'}/>
                This browser does not support HTML5 audio.
            </video>
        </div>
    );
}

export default AgCollectionPage;