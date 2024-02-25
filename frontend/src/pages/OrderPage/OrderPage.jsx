import React from 'react';
import c from './OrderPage.module.scss'
import Container from "../../components/Container/Container";
import CartItems from "../../components/CartItems/CartItems";
import OrderSection from "../../components/OrderSection/OrderSection";
import OrderForm from "../../components/OrderForm/OrderForm";

function OrderPage() {

    return (
        <div className={c.block}>
            <Container style={{padding: 0}}>
                <div className={c['inner-block']}>

                    <div className={c.content}>
                        <div className={c.left}>
                            <OrderForm />
                        </div>
                        <div className={c.right}>
                            <OrderSection dividerClassName={c.divider} titleText={'Ваш заказ'}>
                                <CartItems listClassName={c.orders}/>
                            </OrderSection>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    );
}

export default OrderPage;