import React from 'react';
import c from './CartItems.module.scss'
import CartItem from "../CartItem/CartItem";
import {useSelector} from "react-redux";

const CartItems = ({ listClassName }) => {
    const {products} = useSelector(state => state.cart)

    return (
        <div>
            <ul className={`${c.list} ${listClassName}`}>
                {Array.isArray(products) && products.map(p => (
                    <li className={c.item} key={p?.id}>
                        <CartItem item={p}/>
                    </li>
                ))}
            </ul>

            <p className={c.sum}>Итого: {products.reduce((acc, p) => acc + (p.actualPrice * p.size.quantity), 0)} р.</p>
        </div>
    );
};

export default CartItems;