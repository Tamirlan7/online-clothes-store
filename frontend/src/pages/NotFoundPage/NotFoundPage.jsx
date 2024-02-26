import React from 'react';
import c from './NotFoundPage.module.scss'
import noSignal from "../../assets/videos/banners/no-signal.mp4";
import UnderlineText from "../../UI/UnderlineText/UnderlineText";
import {useNavigate} from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate()

    const goBack = () => {
        navigate('/')
    }

    return (
        <div className={c.wrapper}>
            <video playsInline autoPlay loop muted className={c.video}>
                <source src={noSignal} type={'video/mp4'}/>
            </video>

            <div className={c.inner}>
                <div className={c.content}>

                    <h1 className={c.title}>404</h1>

                    <div className={c.bottom}>
                        <p className={c.text}>PAGE NOT FOUND</p>
                        <button className={c.btn} onClick={goBack}>
                            <UnderlineText underlineColor={'#fff'}>
                                GO BACK
                            </UnderlineText>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;