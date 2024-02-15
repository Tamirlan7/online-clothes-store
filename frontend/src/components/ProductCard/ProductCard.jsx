import React from "react";
import { Link } from "react-router-dom";
import Card from "../../assets/images/item-card.png";
import './ProductCard.scss';
import {API_URL} from "../../constants/AppConstants";

export default function ProductCard({
    id,
    name,
    price,
    priceWithDiscount,
    productMediaFiles,
                                    }) {


    return (
        <Link
            to={`/product/${id}`}
            className='card'
        >
            <img
                src={`${API_URL}/product/${id}/file/${productMediaFiles[0].name}`}
                alt='item'
                className='card__img'
            />
            <div className='card__container'>
                <p className='card__title'>{name}</p>
                <div className="card__price-container">
                    <p className='card__price'>{price}р.</p>
                    {priceWithDiscount > 0 && (
                        <p className='card__sale'>{priceWithDiscount}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
