import React from 'react';
import c from './ProductFileDropModal.module.scss'
import Modal from "../../../UI/Modal/Modal";
import ModalTitle from "../../../UI/ModalTitle/ModalTitle";
import {ReactComponent as File} from "../../../assets/icons/file.svg";

export default ProductFileDropModal;

function ProductFileDropModal({isActive, setIsActive, onDragEnter, onDragLeave, onDragOver, onDrop, ...props}) {
    return (
        <div {...props}>
            <div className={c.block}>
                <div className={c.title}>
                    <ModalTitle fontSize={20}>Отпустите файл для его загрузки</ModalTitle>
                </div>

                <div className={c.content}>
                    <figure><File/></figure>
                    <p className={c.text}>Drag ‘n drop</p>
                </div>
            </div>

            <div
                className={c.dragzone}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
            />
        </div>
    );
}
