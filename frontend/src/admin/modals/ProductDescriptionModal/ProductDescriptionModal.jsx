import React, {useEffect, useState} from 'react';
import c from './ProductDescriptionModal.module.scss'
import Modal from "../../../UI/Modal/Modal";
import ModalTitle from "../../../UI/ModalTitle/ModalTitle";
import Form from "../../../UI/Form/Form";
import {useDispatch} from "react-redux";
import FormControl from "../../../UI/FormControl/FormControl";
import Input from "../../../UI/Input/Input";
import ModalBtns from "../../../UI/ModalBtns/ModalBtns";
import TextArea from "antd/es/input/TextArea";
import {updateProductsThunk} from "../../../thunks/productThunks";

function ProductDescriptionModal({isActive, setIsActive, product}) {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        weight: '',
        description: '',
        dimension: '',
    })

    useEffect(() => {
        if (product) {
            setFormData({
                weight: product.weight,
                description: product.description,
                dimension: product.dimension,
            })
        }
    }, [product]);

    const onChange = e => setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))

    const onConfirm = () => {
        const updatedData = {}

        if (formData.weight !== product?.weight) {
            updatedData.weight = formData.weight
        }

        if (formData.dimension !== product?.dimension) {
            updatedData.dimension = formData.dimension
        }

        if (formData.description !== product?.description) {
            updatedData.description = formData.description
        }

        if (Object.keys(updatedData).length) {
            dispatch(updateProductsThunk({
                data: [
                    {
                        id: product.id,
                        ...updatedData,
                    }
                ]
            }))

            setIsActive(false)
        }
    }

    return (
        <Modal
            setIsActive={setIsActive}
            isActive={isActive}
            className={c.modal}
        >
            <div className={c.block}>
                <div>
                    <ModalTitle>Изменить Описание</ModalTitle>
                </div>

                <Form className={c.form}>
                    <FormControl labelText={'Вес'}>
                        <Input
                            name={'weight'}
                            onChange={onChange}
                            value={formData.weight}
                        />
                    </FormControl>
                    <FormControl labelText={'Габариты'}>
                        <Input
                            name={'dimension'}
                            onChange={onChange}
                            value={formData.dimension}
                        />
                    </FormControl>
                    <FormControl labelText={'Описание'}>
                        <TextArea
                            name={'description'}
                            onChange={onChange}
                            value={formData.description}
                        />
                    </FormControl>

                    <ModalBtns onCancel={() => setIsActive(false)} onNext={onConfirm} confirmBtnText={'Подтвердить'}/>
                </Form>
            </div>
        </Modal>
    );
}

export default ProductDescriptionModal;