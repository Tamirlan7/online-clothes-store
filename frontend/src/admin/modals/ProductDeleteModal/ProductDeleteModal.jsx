import React from 'react';
import c from './ProductDeleteModal.module.scss'
import ModalTitle from "../../../UI/ModalTitle/ModalTitle";
import Modal from "../../../UI/Modal/Modal";
import ModalBtns from "../../../UI/ModalBtns/ModalBtns";

function ProductDeleteModal({isActive, setIsActive}) {
    return (
        <Modal
            isActive={isActive}
            setIsActive={setIsActive}
        >
            <div className={c.block}>
                <div>
                    <ModalTitle>Удалить товар [Название]?</ModalTitle>
                </div>

                <div className={c.content}>
                    <p className={c.text}>Вы действительно хотите безвозвратно <span>удалить товар [Название]?</span></p>
                    <p className={c.note}>Отменить это действие будет невозможно</p>
                </div>

                <ModalBtns
                    confirmBtnText={'Подтвердить'}
                />
            </div>
        </Modal>
    );
}

export default ProductDeleteModal;