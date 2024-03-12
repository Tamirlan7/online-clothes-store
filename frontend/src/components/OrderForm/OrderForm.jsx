import React, {useState} from 'react';
import c from './OrderForm.module.scss'
import Form from "../../UI/Form/Form";
import OrderSection from "../OrderSection/OrderSection";
import FormControl from "../../UI/FormControl/FormControl";
import Input from "../../UI/Input/Input";
import RadioButton from "../../UI/RadioButton/RadioButton";

function OrderForm() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        city: '',
        deliveryService: 'CDEK',
        deliveryPickUpPoint: '',
        fullName: '',
        comment: '',
        promoCode: '',
        paymentMethod: 'Тинькофф',
    })

    const onChange = (e) => {
        setFormData(prev => ({...prev, [e?.target.name]: e.target.value}))
    }

    const onOrder = () => {
    }

    return (
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
                    <Input/>
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

            <div className={c.btn}>
                <button onClick={onOrder}>ОФОРМИТЬ ЗАКАЗ</button>
            </div>
        </Form>
    );
}

export default OrderForm;