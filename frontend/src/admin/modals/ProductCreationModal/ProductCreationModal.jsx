import React, {useEffect, useMemo, useRef} from 'react';
import c from './ProductCreationModal.module.scss'
import Modal from "../../../UI/Modal/Modal";
import ModalTitle from "../../../UI/ModalTitle/ModalTitle";
import FormControl from "../../../UI/FormControl/FormControl";
import Input from "../../../UI/Input/Input";
import Select from "../../../UI/Select/Select";
import AdminSizes from "../../UI/AdminSizes/AdminSizes";
import ModalBtns from "../../../UI/ModalBtns/ModalBtns";
import {useSelector} from "react-redux";
import Form from "../../../UI/Form/Form";
import collectionConverter from "../../../converters/collectionConverter";

function ProductCreationModal({onNext, isActive, setIsActive, formData, setFormData}) {
    const {collections, loading: collectionsLoading, error: collectionError} = useSelector(state => state.collection)
    const {
        clothingTypes,
        loading: clothingTypesLoading,
        error: clothingTypeError
    } = useSelector(state => state.clothingType)
    const inputRef = useRef(null)

    useEffect(() => {

        if (isActive) {
            inputRef.current?.focus();
        }

    }, [isActive]);

    useEffect(() => {

        if (collections.length) {
            setFormData(prev => ({...prev, collection: collections[0].name}))
        }

    }, [collections, setFormData])

    useEffect(() => {
        if (clothingTypes.length) {
            setFormData(prev => ({...prev, clothingType: clothingTypes[0].name}))
        }
    }, [clothingTypes, setFormData]);

    const isFormValid = useMemo(() => {
        const sizesQuantity = Object.values(formData.sizes).reduce((sum, sizeQuantity) => sum + Number(sizeQuantity), 0)
        const sizesAreValid = sizesQuantity === Number(formData.quantity)

        const obj = {
            name: Boolean(formData.name),
            quantity: typeof formData.quantity === "string" ? formData.quantity?.trim() !== '' : formData.quantity > 0,
            price: typeof formData.price === "string" ? formData.price?.trim() !== '' : formData.price >= 0,
            collection: Boolean(formData.collection),
            clothingType: Boolean(formData.clothingType),
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
                    <FormControl invalid={!isFormValid.name} errorMessage={'Название не должно быть пустым'}
                                 labelText={'Введите название'}>
                        <Input invalid={!isFormValid.name} ref={inputRef} name={'name'} value={formData.name}
                               onChange={onChange}/>
                    </FormControl>
                    <FormControl labelText={'Тип одежды'}>
                        <Select onChange={(value) => setFormData((prev) => ({...prev, clothingType: value}))}
                                loading={clothingTypesLoading}
                                value={formData.clothingType}
                                disabled={clothingTypeError}
                                options={clothingTypes?.map((c) => ({
                                    value: c?.name,
                                    text: c?.name
                                }))}/>
                    </FormControl>
                    <FormControl labelText={'Выберите коллекцию'}>
                        <Select loading={collectionsLoading}
                                onChange={(value) => setFormData((prev) => ({...prev, collection: value}))}
                                disabled={collectionError}
                                value={formData.collection}
                                options={collections?.map((c) => ({
                                    value: c?.name,
                                    text: collectionConverter.convertToShorthand(c?.name)
                                }))}/>
                    </FormControl>
                    <FormControl invalid={!isFormValid.price} errorMessage={'Цена должна больше либо равна нулю'}
                                 labelText={'Введите стоимость'}>
                        <Input invalid={!isFormValid.price} name={'price'} value={formData.price} onChange={onChange}
                               mode={'numeric'}/>
                    </FormControl>
                    <FormControl invalid={!isFormValid.quantity} errorMessage={'Кол-во должна больше нуля'}
                                 labelText={'Введите количество товара'}>
                        <Input invalid={!isFormValid.quantity} name={'quantity'} value={formData.quantity}
                               onChange={onChange} mode={'numeric'}/>
                    </FormControl>

                    <FormControl invalid={!isFormValid.sizes}
                                 errorMessage={'Общее кол-во всех размеров должны быть равна общему кол-во товара'}>
                        <AdminSizes
                            sizes={Object.keys(formData.sizes).map((key) => ({
                                sizeLabel: key,
                                value: formData.sizes[key],
                                invalid: !isFormValid.sizes
                            }))}
                            onChange={onSizesChanged}
                        />
                    </FormControl>

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