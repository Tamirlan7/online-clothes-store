import React, {useEffect} from "react";
import Footer from "../../components/Footer/Footer";
import "./AeDrop.scss";
import logo from "../../assets/images/bottomlogo2.svg";
import ProductCard from "../../components/ProductCard/ProductCard";
import { ITEM_CARD } from "../../data/ItemCardData";
import Products from "../../components/Products/Products";
import {useDispatch, useSelector} from "react-redux";
import {collections} from "../../data/collections";
import {getProductsByCollectionThunk} from "../../thunks/productThunks";
import collectionService from "../../services/collectionService";

export default function AeDrop() {
  const dispatch = useDispatch()
  const collection = collections.AE;
  const products = useSelector(state => state.product.products[collection])

  useEffect(() => {
    dispatch(getProductsByCollectionThunk({ collection }))
  }, [collection, dispatch])

  return (
    <>
      <section className='drop'>
        <div className='drop__top-container'>
          <img
            className='drop__img'
            src='https://s3-alpha-sig.figma.com/img/6ef0/78e0/eca3722c7f99fba7ea171f132f191744?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cCfDL~ywAKy~-OtM7~Zy~~ZyYmSlKpsOo7v7OSOF6DORbTKebV9Fh8rGGuUPpgMMvcEhzqZem1Kz53oDSDM1cMw7tfYKJx0AfQQbuQ3KK6bG7wan2ijmWTg~3mWMipD~SHsM0MThNjJg1CxetHJxbNn6-u6h33lBmvqChfoLBi-cj-tDSiB7N94hqiOXSrR~iJb2aSvKvr0j8uBfRsJQ3yBtXVERZcdrpMGtkA7l-jaqro7n2uqZdccQr95YdIEsWrw8evYKF6ErQ7WnVJ77uhD7OoFkVGDfb47QbnsvgstmRPoZ2dXyMLJutFvvFD8~MdjZ2rUlesY7WJRwQvK8qw__'
            alt='animated muted video'
          />
          <div className='drop__overlay'>
            <img
              className='drop__overlay-logo'
              src={logo}
              alt='logo'
            />
            <p className='drop__overlay-text'>
              Также как постоянный количественный рост и сфера нашей активности
              не даёт нам иного выбора, кроме определения приоретизации разума
              над эмоциями. Есть над чем задуматься: представители современных
              социальных резервов набирают популярность среди определенных слоев
              населения, а значит, должны быть своевременно верифицированы.
            </p>
          </div>
        </div>

        <div className='drop__buttons'>
          <div className='drop__container'>
            <input
              className='drop__input'
              placeholder='SEARCH'
            ></input>
            <div className='drop__buttons-container'>
              <button className='drop__button'>HOODIE</button>
              <button className='drop__button'>T-SHIRTS</button>
              <button className='drop__button'>SCARF</button>
              <button className='drop__button'>ACCSESSORIES</button>
              <button className='drop__button'>SALE %%%</button>
            </div>
          </div>
        </div>

        <div>
          <Products products={products} />
        </div>
		<div className="drop__empty"></div>
      </section>
      <Footer />
    </>
  );
}
