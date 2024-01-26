import './CollectionCard.scss'
import { Link } from "react-router-dom"


const CollectionCard = ({ text, bottomLogoSrc, dropLogoSrc, dropImgSrc, href  }) => {

    return (
        <Link
            to={href}
            className='home__drop'
        >
            <img
                className='home__drop-img'
                src={dropImgSrc}
                alt='drop'
            />
            <div className='home__overlay'>
                <img
                    className='home__overlay-logo'
                    src={dropLogoSrc}
                    alt='drop-1'
                    id='overlay-logo'
                />
                <p
                    className='home__overlay-description'
                    id='overlay-description'
                >{text}</p>
                <img
                    className='home__bottom-logo'
                    id='bottom-logo'
                    src={bottomLogoSrc}
                    alt='drop'
                />
            </div>
      </Link>
    )
}

export default CollectionCard
