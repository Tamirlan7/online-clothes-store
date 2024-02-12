import React from 'react';
import c from './ModalBtns.module.scss'
import Loader from "../Loader/Loader";

function ModalBtns({onCancel, onNext, cancelBtnText, confirmBtnText, isConfirmBtnDisabled, loading}) {
    function handleOnCancelClick() {
        if (onCancel) {
            onCancel()
        }
    }

    function handleOnConfirmClick() {
        if (isConfirmBtnDisabled) {
            return null
        }

        if (loading) {
            return null
        }

        if (onNext) {
            onNext()
        }
    }

    return (
        <div className={c.btns}>
            <button type={'button'} onClick={() => handleOnCancelClick()}
                    className={`${c.btn} ${c['btn-cancel']}`}>{cancelBtnText ?? 'Отмена'}</button>
            <button onClick={() => handleOnConfirmClick()}
                    disabled={isConfirmBtnDisabled}
                    className={loading ? `${c.btn} ${c['btn-confirm']} ${c['loading-btn']}` : `${c.btn} ${c['btn-confirm']}`}>
                {loading ? (
                    <Loader loaderClassName={c.loader} loading={true}/>
                ) : (
                    <>{confirmBtnText ?? 'Далее'}</>
                )}
            </button>
        </div>
    );
}

export default ModalBtns;