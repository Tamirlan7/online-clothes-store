import React from "react";
import "./HomePage.scss";
import drop1logo from "../../assets/images/logodrop-1.svg";
import drop2logo from "../../assets/images/logodrop-2.svg";
import drop3logo from "../../assets/images/logodrop-3.svg";
import bottomlogo1 from "../../assets/images/bottomlogo1.svg";
import bottomlogo2 from "../../assets/images/bottomlogo2.svg";
import bottomlogo3 from "../../assets/images/bottomlogo-3.svg";
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
                    dropLogoSrc={drop1logo}
                    bottomLogoSrc={bottomlogo1}
                    text={'UNC — the clothing brand has been in existence since 2021. Basing and logistics management in Russia, Cheboksary.'}
                />
            </div>

            <div className={'home__collection'}>
                <CollectionCard
                    href={RoutePaths.ALTERNATIVE_EDGE}
                    dropImgSrc={alternativeEdge}
                    dropLogoSrc={drop2logo}
                    bottomLogoSrc={bottomlogo2}
                    text={'UNC — the clothing brand has been in existence since 2021. Basing and logistics management in Russia, Cheboksary.'}
                />
            </div>

            <div className={'home__collection'}>
                <CollectionCard
                    href={RoutePaths.ADVANCED_GEAR}
                    dropImgSrc={noSignal}
                    dropLogoSrc={drop3logo}
                    bottomLogoSrc={bottomlogo3}
                    text={'UNC — the clothing brand has been in existence since 2021. Basing and logistics management in Russia, Cheboksary.'}
                />
            </div>
        </section>
);
}


export default HomePage
