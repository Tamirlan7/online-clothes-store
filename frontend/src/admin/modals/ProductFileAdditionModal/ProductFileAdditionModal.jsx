import React from 'react';
import c from './ProductFileAdditionModal.module.scss'
import Modal from "../../../UI/Modal/Modal";
import ModalTitle from "../../../UI/ModalTitle/ModalTitle";
import ModalBtns from "../../../UI/ModalBtns/ModalBtns";
import {ReactComponent as UploadFile} from "../../../assets/icons/upload-file.svg";
import InputFile from "../../../UI/InputFile/InputFile";
import Files from "../../components/Files/Files";
import {useDispatch} from "react-redux";
import {raiseNotification} from "../../../slices/notificationSlice";

function ProductFileAdditionModal({isActive, setIsActive, onNext, formData, setFormData}) {
    const dispatch = useDispatch()

    const onFilesChange = (e) => {
        if (formData?.files) {
            const files = e.target.files;

            // Ограничиваем количество выбранных файлов до максимума 4
            if (files.length + formData.files.length > 4) {
                dispatch(raiseNotification({
                    message: 'Ошибка',
                    description: 'Максимальное количество файлов - 4',
                    type: 'error'
                }))

                return;
            }

            // Обновляем состояние выбранных файлов
            setFormData(prev => ({...prev, files: [...prev.files, ...Array.from(files)]}))
        }
    };

    const onDeleteFile = (fileIdx) => {
        const newFiles = [...formData.files];
        newFiles.splice(fileIdx, 1);
        setFormData(prev => ({...prev, files: newFiles}))
    }
    const onEditFile = (fileIdx) => {
        // file editing
    }

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
                        <UploadFile/>
                    </figure>

                    <div className={c['text-content']}>
                        <h2 className={c.title}>Вложите фотографии товара</h2>
                        <p className={c.note}>Не более 4-ех фото!</p>
                        <p className={c.text}>Протяните файл для его загрузки или выберите его при помощи кнопки.</p>
                    </div>

                    {formData?.files['length'] ? (
                        <div className={c.files}>
                            <Files files={formData.files} onDeleteFile={onDeleteFile} onEditFile={onEditFile}/>
                        </div>
                    ) : <></>}

                    {formData?.files['length'] < 4 && (
                        <InputFile onChange={onFilesChange}
                                   label={'Вложить фото'}
                                   className={c.btn}
                                   multiple
                                   accept={'image/*'}/>
                    )}
                </div>

                <ModalBtns onNext={() => {
                    if (onNext) {
                        onNext()
                    }
                }}/>
            </div>
        </Modal>
    );
}

export default ProductFileAdditionModal;