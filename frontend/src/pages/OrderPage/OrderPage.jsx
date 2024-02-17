import React, {useState} from 'react';
import c from './OrderPage.module.scss'
import Container from "../../components/Container/Container";
import CartItems from "../../components/CartItems/CartItems";
import OrderSection from "../../components/OrderSection/OrderSection";
import FormControl from "../../UI/FormControl/FormControl";
import Input from "../../UI/Input/Input";
import Form from "../../UI/Form/Form";
import RadioButton from "../../UI/RadioButton/RadioButton";

function OrderPage() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        city: '',
        deliveryService: 'CDEK',
        deliveryPicUpPoint: '',
        fullName: '',
        comment: '',
        promoCode: '',
        paymentMethod: 'Тинькофф',
    })

    const onChange = (e) => {
        setFormData(prev => ({...prev, [e?.target.name]: e.target.value}))
    }

    return (
        <div className={c.block}>
            <Container style={{padding: 0}}>
                <div className={c['inner-block']}>

                    <div className={c.content}>
                        <div className={c.left}>
                            <Form className={c.form}>
                                <OrderSection titleText={'КОНТАКТЫ'}>
                                    <FormControl labelText={'Ваш email'}>
                                        <Input placeholder={'alexandr@gmail.com'}/>
                                    </FormControl>
                                    <FormControl labelText={'Ваш мобильный телефон'}>
                                        <Input placeholder={'+7 (---) --- -- --'}/>
                                    </FormControl>
                                </OrderSection>

                                <OrderSection titleText={'ДОСТАВКА'}>
                                    <FormControl labelText={'Город'}>
                                        <Input placeholder={'Москва'}/>
                                        <span className={c.note}>Россия, Иркутская область, г. Иркутск</span>
                                    </FormControl>
                                    <FormControl>
                                        <div className={c['radio-btns']}>
                                            <RadioButton name={'deliveryService'} onChange={onChange} label={'CDEK'}
                                                         value={'CDEK'}
                                                         checked={formData.deliveryService === 'CDEK'}/>
                                            <RadioButton name={'deliveryService'} onChange={onChange}
                                                         label={'Почта России'} value={'Почта России'}
                                                         checked={formData.deliveryService === 'Почта России'}/>
                                        </div>
                                    </FormControl>
                                    <FormControl labelText={'Пункт получения'}>
                                        <Input placeholder={'улица Шаврова 21'}/>
                                    </FormControl>
                                    <FormControl labelText={'Введите ваше ФИО'}>
                                        <Input placeholder={'Александр Попов Иванович'}/>
                                    </FormControl>
                                    <FormControl labelText={'Комментарий'}>
                                        <Input placeholder={'Хотел бы уточнить об...'}/>
                                    </FormControl>
                                    <FormControl labelText={'Промокод'}>
                                        <Input />
                                    </FormControl>
                                </OrderSection>

                                <OrderSection titleText={'СПОСОБ ОПЛАТЫ'}>
                                    <FormControl>
                                        <div className={c['radio-btns']}>
                                            <RadioButton name={'paymentMethod'} onChange={onChange} label={'Тинькофф'}
                                                         value={'Тинькофф'}
                                                         checked={formData.paymentMethod === 'Тинькофф'}/>
                                            <RadioButton name={'paymentMethod'} onChange={onChange}
                                                         label={'Долями Тинькофф'} value={'Долями Тинькофф'}
                                                         checked={formData.paymentMethod === 'Долями Тинькофф'}/>
                                        </div>
                                    </FormControl>
                                </OrderSection>

                                <button className={c.btn}>Оформить заказ</button>
                            </Form>
                        </div>
                        <div className={c.right}>
                            <div className={c.info}>
                                <h2 className={c.title}>Ваш Заказ</h2>
                                <CartItems/>
                                <p className={c.sum}>Итого: 14.000 р.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    );
}

export default OrderPage;