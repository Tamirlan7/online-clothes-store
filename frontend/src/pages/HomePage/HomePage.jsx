import React from "react";
import "./HomePage.scss";
import dropUncLogo from "../../assets/images/dropUncLogo.svg";
import dropAeLogo from "../../assets/images/dropAeLogo.svg";
import dropAgLogo from "../../assets/images/dropAgLogo.svg";

import uncBottomLogo from "../../assets/images/uncBottomLogo.svg";
import bottomAeLogo from "../../assets/images/bottomAeLogo.svg";
import bottomAgLogo from "../../assets/images/bottomAgLogo.svg";

import CollectionCard from "../../components/CollectionCard/CollectionCard";
import {RoutePaths} from "../../router/RouteConstants";
import uncriders from '../../assets/videos/banners/uncriders.MP4'
import alternativeEdge from '../../assets/videos/banners/alternative-edge.MP4'
import noSignal from '../../assets/videos/banners/no-signal.mp4'

const HomePage = () => {
    return (
        <section className='home'>
            <div className={'home__collection'}>
                <CollectionCard
                    href={RoutePaths.UNCRIDERS}
                    dropImgSrc={uncriders}
                    dropLogoSrc={dropUncLogo}
                    bottomLogoSrc={uncBottomLogo}
                    text={'UNC — the clothing brand has been in existence since 2021. Basing and logistics management in Russia, Cheboksary.'}
                />
            </div>

            <div className={'home__collection'}>
                <CollectionCard
                    href={RoutePaths.ALTERNATIVE_EDGE}
                    dropImgSrc={alternativeEdge}
                    dropLogoSrc={dropAeLogo}
                    bottomLogoSrc={bottomAeLogo}
                    text={'UNC — the clothing brand has been in existence since 2021. Basing and logistics management in Russia, Cheboksary.'}
                />
            </div>

            <div className={'home__collection'}>
                <CollectionCard
                    href={RoutePaths.ADVANCED_GEAR}
                    dropImgSrc={noSignal}
                    dropLogoSrc={dropAgLogo}
                    bottomLogoSrc={bottomAgLogo}
                    text={'UNC — the clothing brand has been in existence since 2021. Basing and logistics management in Russia, Cheboksary.'}
                />
            </div>
        </section>
);
}


export default HomePage
