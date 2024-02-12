import React, {useEffect, useMemo, useRef} from 'react';
import c from './ProductCreationModal.module.scss'
import Modal from "../../../UI/Modal/Modal";
import ModalTitle from "../../../UI/ModalTitle/ModalTitle";
import FormControl from "../../../UI/FormControl/FormControl";
import Input from "../../../UI/Input/Input";
import Select from "../../../UI/Select/Select";
import AdminSizes from "../../UI/AdminSizes/AdminSizes";
import ModalBtns from "../../../UI/ModalBtns/ModalBtns";
import Loader from "../../../UI/Loader/Loader";
import {useSelector} from "react-redux";
import Form from "../../../UI/Form/Form";

function ProductCreationModal({onNext, isActive, setIsActive, formData, setFormData}) {
    const inputRef = useRef(null)

    useEffect(() => {

        if (isActive) {
            inputRef.current?.focus();
        }

    }, [isActive]);

    const isFormValid = useMemo(() => {
        const sizesQuantity = Object.values(formData.sizes).reduce((sum, sizeQuantity) => sum + Number(sizeQuantity), 0)
        const sizesAreValid = sizesQuantity === Number(formData.quantity)

        const obj = {
            name: formData.name,
            quantity: formData.quantity > 0,
            price: formData.price >= 0,
            collection: formData.collection,
            clothingType: formData.clothingType,
            sizes: sizesAreValid,
        }

        obj.all = (
            obj.name && obj.quantity && obj.price && obj.collection && obj.clothingType && obj.sizes
        )

        return obj
    }, [formData])

    const onChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const onSizesChanged = (size, newValue) => {
        setFormData((prev) => ({...prev, sizes: {...formData.sizes, [size.sizeLabel]: newValue}}))
    }

    return (
        <Modal
            isActive={isActive}
            setIsActive={setIsActive}
        >
            <div className={c.block}>
                <div>
                    <ModalTitle>Добавить товар</ModalTitle>
                </div>

                <Form className={c.form}>
                    <FormControl labelText={'Введите название'}>
                        <Input ref={inputRef} name={'name'} value={formData.name} onChange={onChange}/>
                    </FormControl>
                    <FormControl labelText={'Тип одежды'}>
                        <Select onChange={(value) => setFormData((prev) => ({...prev, clothingType: value}))}
                                value={formData.clothingType} options={[
                            {
                                text: 'Джерси',
                                value: 'Джерси'
                            },
                            {
                                text: 'Худи',
                                value: 'Худи'
                            },

                            {
                                text: 'Футболка',
                                value: 'Футболка'
                            },
                        ]}/>
                    </FormControl>
                    <FormControl labelText={'Выберите коллекцию'}>
                        <Select onChange={(value) => setFormData((prev) => ({...prev, collection: value}))}
                                value={formData.collection} options={[
                            {
                                text: 'AG',
                                value: 'ag'
                            },
                            {
                                text: 'UNC',
                                value: 'unc'
                            },

                            {
                                text: 'AE',
                                value: 'ae'
                            },
                        ]}/>
                    </FormControl>
                    <FormControl labelText={'Введите стоимость'}>
                        <Input name={'price'} value={formData.price} onChange={onChange} mode={'numeric'}/>
                    </FormControl>
                    <FormControl labelText={'Введите количество товара'}>
                        <Input name={'quantity'} value={formData.quantity} onChange={onChange} mode={'numeric'}/>
                    </FormControl>

                    <AdminSizes
                        sizes={Object.keys(formData.sizes).map((key) => ({
                            sizeLabel: key,
                            value: formData.sizes[key],
                            invalid: key === 'M'
                        }))}
                        onChange={onSizesChanged}
                    />

                    <ModalBtns onCancel={() => setIsActive(false)} onNext={() => {
                        if (onNext) {
                            onNext()
                        }
                    }} isConfirmBtnDisabled={!isFormValid.all}/>
                </Form>
            </div>
        </Modal>
    );
}

export default ProductCreationModal;