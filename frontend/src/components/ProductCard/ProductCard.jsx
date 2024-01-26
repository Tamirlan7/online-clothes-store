import React from "react";
import { Link } from "react-router-dom";
import Card from "../../assets/images/item-card.png";
import './ProductCard.scss';

export default function ProductCard({
    id,
    name,
    price,
    discountPercentage
                                    }) {

    const priceWithDiscount = discountPercentage > 0 ? price * (discountPercentage / 100) : null

    return (
        <Link
            to={`${"/ae/item"}/${id}`}
            className='card'
        >
            <img
                src={Card}
                alt='item'
                className='card__img'
            />
            <div className='card__container'>
                <p className='card__title'>{name}</p>
                <div className="card__price-container">
                    <p className='card__price'>{price}р.</p>
                    <p className='card__sale'>600р.</p>
                </div>
            </div>
        </Link>
    );
}
