import React from 'react';
import c from './CartItems.module.scss'
import CartItem from "../CartItem/CartItem";
import {useSelector} from "react-redux";

const CartItems = () => {
    const {products} = useSelector(state => state.cart)

    return (
        <ul className={c.list}>
            {Array.isArray(products) && products.map(p => (
                <li className={c.item} key={p?.id}>
                    <CartItem item={p}/>
                </li>
            ))}
        </ul>
    );
};

export default CartItems;