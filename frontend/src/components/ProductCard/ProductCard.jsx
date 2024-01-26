import React from "react";
import { Link } from "react-router-dom";
import Card from "../../assets/images/item-card.png";
import './ProductCard.scss';

export default function ProductCard({ card }) {
  const { id } = card;
  const cardId = `${id}`;
  return (
    <Link
      to={`${"/ae/item"}/${cardId}`}
      className='card'
    >
      <img
        src={Card}
        alt='item'
        className='card__img'
      />
      <div className='card__container'>
        <p className='card__title'>{card.title}</p>
        <div className="card__price-container">
          <p className='card__price'>{card.price}р.</p>
          <p className='card__sale'>{card.sale}р.</p>
        </div>
      </div>
    </Link>
  );
}
