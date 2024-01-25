import React from "react";
import drop1 from "../../images/drop-1.gif";
import drop2 from "../../images/drop-2.png";
import drop3 from "../../images/drop-3.png";
import drop1logo from "../../images/logodrop-1.svg";
import drop2logo from "../../images/logodrop-2.svg";
import drop3logo from "../../images/logodrop-3.svg";
import bottomlogo1 from "../../images/bottomlogo1.svg";
import bottomlogo2 from "../../images/bottomlogo2.svg";
import bottomlogo3 from "../../images/bottomlogo-3.svg";
import "./home.scss";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className='home'>
      <Link
        to='/ur'
        className='home__drop'
      >
        <img
          className='home__drop-img'
          src='https://s3-alpha-sig.figma.com/img/a7df/8489/e72cb5809ac7cbbf7b3eb19923ef0379?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RbVyGuGgOdKcKP2iZWJZ9lnXlAorSbH7AAitw5uX-Yg4~Q9WktzGjgloVMXmluFIi1gcsK33z-G69paRinhjNemxeCPtyvJM~b7n1r6-8d4yy11uiLhdSB4koHbw7i~1GKkZn5rLWlwDM-GhiYjkDS1kCgezbZUNH9jdEbTfuF5b8QTpw4n~WmaOH7Uc2QXF8JyE6sF5I2gYsVHD7w583424jkrLGMg0Ie8JQZpDjqXMexNlssE8zFCtHaogToXOQkWG2IAIJp5wigCujsyYuBwLfvO7uMyVx5KcSOrdviBcHza13li8y6Y-cyBNMqeQK7q4GxywjKcKyDjgvfvMQA__'
          alt='drop-1'
        />
        <div className='home__overlay'>
          <img
            className='home__overlay-logo'
            src={drop1logo}
            alt='drop-1'
            id='overlay-logo'
          />
          <p
            className='home__overlay-description'
            id='overlay-description'
          >
            UNC — the clothing brand has been in existence since 2021. Basing
            and logistics management in Russia, Cheboksary.
          </p>
          <img
            className='home__bottom-logo'
            id='bottom-logo'
            src={bottomlogo1}
            alt='drop-1'
          ></img>
        </div>
      </Link>
      <Link
        to='/ae'
        className='home__drop'
      >
        <img
          className='home__drop-img'
          src='https://s3-alpha-sig.figma.com/img/6ef0/78e0/eca3722c7f99fba7ea171f132f191744?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cCfDL~ywAKy~-OtM7~Zy~~ZyYmSlKpsOo7v7OSOF6DORbTKebV9Fh8rGGuUPpgMMvcEhzqZem1Kz53oDSDM1cMw7tfYKJx0AfQQbuQ3KK6bG7wan2ijmWTg~3mWMipD~SHsM0MThNjJg1CxetHJxbNn6-u6h33lBmvqChfoLBi-cj-tDSiB7N94hqiOXSrR~iJb2aSvKvr0j8uBfRsJQ3yBtXVERZcdrpMGtkA7l-jaqro7n2uqZdccQr95YdIEsWrw8evYKF6ErQ7WnVJ77uhD7OoFkVGDfb47QbnsvgstmRPoZ2dXyMLJutFvvFD8~MdjZ2rUlesY7WJRwQvK8qw__'
          alt='drop-2'
        />
        <div className='home__overlay'>
          <img
            className='home__overlay-logo'
            src={drop2logo}
            alt='drop-2'
            id='overlay-logo'
          />
          <p
            className='home__overlay-description'
            id='overlay-description2'
          >
            UNC — the clothing brand has been in existence since 2021. Basing
            and logistics management in Russia, Cheboksary.
          </p>
          <img
            className='home__bottom-logo'
            id='bottom-logo'
            src={bottomlogo2}
            alt='drop-2'
          ></img>
        </div>
      </Link>
      <Link
        to='/ag'
        className='home__drop'
      >
        <img
          className='home__drop-img'
          src='https://s3-alpha-sig.figma.com/img/991a/3528/ac368ae0601793ca6bce4c48c3a946d0?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oYz8oPNKkzSnwpSBcc6fNpmpvFPIItYSKHCdXIGBk2n8af8kf5QGiMcIxFXaahY~224O7KiIH8W89y~KcTAdmbD6TFmPi2ox95pP9bdukh1gur4rvyzNoG9~~FRlRMutBeG0mE-eyJKZc2b-mLBr~qIiEw7NXhDkfJNQmarGu6s-ZNG-x3cJSBX7NRos0tv48MFWK-1vgUYxMTd6uzp3~6v3oPTKFXYsfvxXCFCB31FvTo11sO7FlG6tqCVc5yw~4ryHbc3tScLYWQ7hfQteK~LIGrYk6fFftOJT9N6kI6DG-3HWgdZsE4z2x~v-W3LZkCMxMUiHzLunOdDsGinSCw__'
          alt='drop-3'
        />
        <div className='home__overlay'>
          <img
            className='home__overlay-logo'
            src={drop3logo}
            alt='drop-3'
            id='overlay-logo'
          ></img>
          <p
            className='home__overlay-description'
            id='overlay-description'
          >
            UNC — the clothing brand has been in existence since 2021. Basing
            and logistics management in Russia, Cheboksary.
          </p>
          <img
            className='home__bottom-logo'
            id='bottom-logo'
            src={bottomlogo3}
            alt='drop-3'
          ></img>
        </div>
      </Link>
    </section>
  );
}
