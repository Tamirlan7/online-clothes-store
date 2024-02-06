import React from 'react';
import c from './ProductFileAdditionModal.module.scss'
import Modal from "../../../UI/Modal/Modal";
import ModalTitle from "../../../UI/ModalTitle/ModalTitle";
import ModalBtns from "../../../UI/ModalBtns/ModalBtns";
import { ReactComponent as UploadFile } from "../../../assets/icons/upload-file.svg";

function ProductFileAdditionModal({isActive, setIsActive}) {

    return (
        <Modal
            isActive={isActive}
            setIsActive={setIsActive}
        >
            <div className={c.block}>
                <div>
                    <ModalTitle>Добавить фото к товару</ModalTitle>
                </div>

                <div className={c.content}>
                    <figure>
                        <UploadFile />
                    </figure>

                    <div className={c['text-content']}>
                        <h2 className={c.title}>Вложите фотографии товара</h2>
                        <p className={c.note}>Не более 4-ех фото!</p>
                        <p className={c.text}>Протяните файл для его загрузки или выберите его при помощи кнопки.</p>
                    </div>

                    <button className={c.btn}>Вложить фото</button>
                </div>

                <ModalBtns/>
            </div>
        </Modal>
    );
}

export default ProductFileAdditionModal;