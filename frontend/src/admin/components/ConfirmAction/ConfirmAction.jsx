import React from 'react';
import c from './ConfirmAction.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {changeShowConfirmAction} from "../../../slices/productSlice";

function ConfirmAction({ btnText, onConfirm }) {
    const dispatch = useDispatch()
    const {showConfirmAction} = useSelector(state => state.product)

    const handleOnClick = () => {
        if (onConfirm) {
            onConfirm()
        }

        dispatch(changeShowConfirmAction(false))
    }

    if (!showConfirmAction) {
        return <></>
    }

    return (
        <div className={c.block}>
            <div className={c['inner-block']}>
                <button className={c.button} onClick={handleOnClick}>{btnText ?? 'Подтвердить'}</button>
            </div>
        </div>
    );
}

export default ConfirmAction;