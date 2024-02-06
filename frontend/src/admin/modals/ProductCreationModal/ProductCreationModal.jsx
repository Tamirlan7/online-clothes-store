import React, {useState} from 'react';
import c from './ProductCreationModal.module.scss'
import Modal from "../../../UI/Modal/Modal";
import ModalTitle from "../../UI/ModalTitle/ModalTitle";
import FormControl from "../../UI/FormControl/FormControl";
import AdminInput from "../../UI/AdminInput/AdminInput";
import AdminSelect from "../../UI/AdminSelect/AdminSelect";
import AdminSizes from "../../UI/AdminSizes/AdminSizes";
import AdminModalBtns from "../../UI/AdminModalBtns/AdminModalBtns";

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
                        <AdminInput/>
                    </FormControl>
                    <FormControl labelText={'Тип одежды'}>
                        <AdminSelect onChange={(value) => setFormData((prev) => ({...prev, clothingType: value}))}
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
                        <AdminSelect onChange={(value) => setFormData((prev) => ({...prev, collection: value}))}
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
                        <AdminInput mode={'numeric'} />
                    </FormControl>
                    <FormControl labelText={'Введите количество товара'}>
                        <AdminInput mode={'numeric'} />
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

                <AdminModalBtns isConfirmBtnDisabled={true}/>
            </div>
        </Modal>
    );
}

export default ProductCreationModal;