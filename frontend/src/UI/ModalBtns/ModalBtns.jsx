import React from 'react';
import c from './ModalBtns.module.scss'

function ModalBtns({onCancel, onNext, cancelBtnText, confirmBtnText, isConfirmBtnDisabled}) {
    function handleOnCancelClick() {
        if (onCancel) {
            onCancel()
        }
    }

    function handleOnConfirmClick() {
        if (isConfirmBtnDisabled) {
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
                    className={`${c.btn} ${c['btn-confirm']}`}>{confirmBtnText ?? 'Далее'}</button>
        </div>
    );
}

export default ModalBtns;