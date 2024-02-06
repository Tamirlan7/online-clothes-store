import React, {useState} from 'react';
import c from './ProductCreationModal.module.scss'
import Modal from "../../../UI/Modal/Modal";
import ModalTitle from "../../../UI/ModalTitle/ModalTitle";
import FormControl from "../../../UI/FormControl/FormControl";
import Input from "../../../UI/Input/Input";
import Select from "../../../UI/Select/Select";
import AdminSizes from "../../UI/AdminSizes/AdminSizes";
import ModalBtns from "../../../UI/ModalBtns/ModalBtns";

function ProductCreationModal({isActive, setIsActive}) {
    const [formData, setFormData] = useState({
        clothingType: 'Джерси',
        collection: 'ae',
        sizes: {
            'XS': '0',
            'S': '0',
            'M': '0',
            'L': '0',
            'XL': '0',
            'XXL': '0'
        }
    })

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

                <form className={c.form}>
                    <FormControl labelText={'Введите название'}>
                        <Input/>
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
                        <Input mode={'numeric'} />
                    </FormControl>
                    <FormControl labelText={'Введите количество товара'}>
                        <Input mode={'numeric'} />
                    </FormControl>

                    <AdminSizes
                        sizes={Object.keys(formData.sizes).map((key) => ({
                            sizeLabel: key,
                            value: formData.sizes[key],
                            invalid: key === 'M'
                        }))}
                        onChange={onSizesChanged}
                    />
                </form>

                <ModalBtns isConfirmBtnDisabled={true}/>
            </div>
        </Modal>
    );
}

export default ProductCreationModal;