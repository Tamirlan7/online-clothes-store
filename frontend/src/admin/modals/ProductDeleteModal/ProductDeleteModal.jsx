import React from 'react';
import c from './ProductDeleteModal.module.scss'
import ModalTitle from "../../../UI/ModalTitle/ModalTitle";
import Modal from "../../../UI/Modal/Modal";
import ModalBtns from "../../../UI/ModalBtns/ModalBtns";
import {useDispatch, useSelector} from "react-redux";
import {deleteProductThunk} from "../../../thunks/productThunks";

function ProductDeleteModal({isActive, setIsActive, product}) {
    const {deleteLoading} = useSelector(state => state.product)
    const dispatch = useDispatch()

    const confirmDeletion = () => {
        dispatch(deleteProductThunk({
            id: product.id
        }))

        setIsActive(false)

    }

    return (
        <Modal
            isActive={isActive}
            setIsActive={setIsActive}
        >
            <div className={c.block}>
                <div>
                    <ModalTitle>Удалить товар {product.name}?</ModalTitle>
                </div>

                <div className={c.content}>
                    <p className={c.text}>Вы действительно хотите
                        безвозвратно <span>удалить товар {product.name}?</span></p>
                    <p className={c.note}>Отменить это действие будет невозможно</p>
                </div>

                <ModalBtns
                    loading={deleteLoading}
                    onCancel={() => setIsActive(false)}
                    onNext={() => confirmDeletion()}
                    confirmBtnText={'Подтвердить'}
                />
            </div>
        </Modal>
    );
}

export default ProductDeleteModal;