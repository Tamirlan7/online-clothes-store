import React, {useEffect, useState} from 'react';
import c from './Cart.module.scss'
import {ReactComponent as Close} from '../../assets/icons/close.svg'
import {useDispatch, useSelector} from "react-redux";
import {hideCart} from "../../slices/cartSlice";
import CartItems from "../CartItems/CartItems";
import {useNavigate} from "react-router-dom";
import {RoutePaths} from "../../router/RouteConstants";
import {Empty} from "antd";
import OrderForm from "../OrderForm/OrderForm";
import {changeFooterVisible} from "../../slices/appSlice";

function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {visible, products} = useSelector(state => state.cart)
    const { device } = useSelector(state => state.app)
    const [showOrderForm, setShowOrderForm] = useState(false)

    useEffect(() => {
        dispatch(changeFooterVisible(false))
    }, [dispatch])

    const onClose = () => {
        dispatch(hideCart())
        dispatch(changeFooterVisible(true))

        if (showOrderForm) {
            setShowOrderForm(false)
        }
    }

    const onOrder = () => {
        if (device.width <= 900) {
            setShowOrderForm(true)
            return;
        }

        if (showOrderForm) {
            setShowOrderForm(false)
        }

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


                        <div className={c.btn}>
                            <button onClick={onOrder}>ОФОРМИТЬ ЗАКАЗ</button>
                        </div>

                        {showOrderForm && (
                            <div className={c.form}>
                                <OrderForm />
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className={c.header} style={{justifyContent: "flex-end"}}>
                            <figure onClick={onClose}><Close/></figure>
                        </div>
                        <Empty style={{fontFamily: 'inherit', fontSize: 16}} description={'В корзине нет товаров'}/>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;