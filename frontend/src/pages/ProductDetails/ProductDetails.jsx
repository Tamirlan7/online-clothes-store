import React, { useState, useEffect } from "react";
import './ProductDetails.scss'
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import item from "../../assets/images/item-card.png";
import {useDispatch, useSelector} from "react-redux";
import {getProductById} from "../../thunks/productThunks";

export default function ProductDetails() {
  const dispatch = useDispatch()
  const currentProduct = useSelector(state => state.product.currentProduct)
  const { productId } = useParams();

  useEffect(() => {
    if (currentProduct?.id !== parseInt(productId)) {
      dispatch(getProductById(productId))
    }

  }, [currentProduct?.id, dispatch, productId])

  return (
    <>
      {currentProduct && Object.keys(currentProduct).length && (
        <section className='item'>
          <div className='item__image-container'>
            <img
              className='item__image'
              src={item}
              alt='item'
            />
            <div></div>
          </div>
          <div className='item__container'>
            <h1 className='item__title'>{currentProduct.title}</h1>
            <ul className='item__info'>
              <li>
                Коллекция:
                <span>UNC</span>
              </li>
              <li>
                Артикул:
                <span>Джерси</span>
              </li>
              <li>
                Характеристики:
                <span>ДxШxВ: 400x300x10 мм Вес: 250 г</span>
              </li>
            </ul>
            <p className='item__price'>
              {currentProduct.price}p. <span>600 p.</span>
            </p>

            <div className='item__size-buttons'>
              <button className='item__size-button'>XS</button>
              <button className='item__size-button'>S</button>
              <button className='item__size-button'>M</button>
              <button className='item__size-button'>L</button>
              <button className='item__size-button'>XL</button>
            </div>
            <div className='item__num-avalaible'>
              <p></p>
              <p></p>
              <p>Последний</p>
              <p>Осталось 2</p>
              <p>Осталось 2</p>
            </div>
            <div>
              <button className="item__buy-btn">Купить</button>
              <button className="item__pay-partly">ДОЛЯМИ</button>
            </div>
            <p className='item__preorder'>
              Новый предзаказ открыт до 10 января. Отправка будет осуществляться
              в течение 7-10 рабочих дней после закрытия предзаказа.
            </p>
            <p className='item__material'>
              Джерси сделана из нестандартного материала - двухсторонний
              флис.Плотность материала - 270гр, внутри имеется небольшой начёс.
              Установлены фиксаторы на рукавах и снизу изделия.
            </p>
            <p className='item__set'>
              В комплекте с изделием идёт карта с QR-кодом, на источник с
              информацией по уходу и стикер.
            </p>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
