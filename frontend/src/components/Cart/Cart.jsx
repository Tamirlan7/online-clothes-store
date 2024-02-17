import React from 'react';
import c from './Cart.module.scss'
import {ReactComponent as Close} from '../../assets/icons/close.svg'
import {useDispatch, useSelector} from "react-redux";
import {hideCart} from "../../slices/cartSlice";
import CartItems from "../CartItems/CartItems";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../router/RouteConstants";
import products from "../Products/Products";
import {Empty} from "antd";

function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {visible, products} = useSelector(state => state.cart)

    const onClose = () => {
        dispatch(hideCart())
    }

    const onOrder = () => {
        dispatch(hideCart())
        navigate(RoutePaths.ORDER)
    }

    if (!visible) {
        return <></>
    }


    return (
        <div className={c.block}>
            <div className={c.content}>
                {products.length ? (
                    <>
                        <div className={c.header}>
                            <h2 className={c.title}>Ваш заказ</h2>
                            <figure onClick={onClose}><Close/></figure>
                        </div>

                        <div className={c.main}>
                            <CartItems/>
                        </div>

                        <p className={c.sum}>Итого: {products.reduce((acc, p) => acc + (p.actualPrice * p.size.quantity), 0)} р.</p>

                        <div className={c.btn}>
                            <button onClick={onOrder}>ОФОРМИТЬ ЗАКАЗ</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={c.header} style={{ justifyContent: "flex-end" }}>
                            <figure onClick={onClose}><Close/></figure>
                        </div>
                        <Empty style={{ fontFamily: 'inherit', fontSize: 16 }} description={'В корзине нет товаров'} />
                    </>
            )}
        </div>
</div>
)
    ;
}

export default Cart;