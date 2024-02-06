import React, {useState} from 'react';
import c from './LoginPopup.module.scss'
import Popup from "../../UI/Popup/Popup";
import {useDispatch} from "react-redux";
import {changeShowAuthenticationPopup} from "../../slices/userSlice";
import ModalTitle from "../../UI/ModalTitle/ModalTitle";
import FormControl from "../../UI/FormControl/FormControl";
import Input from "../../UI/Input/Input";
import ModalBtns from "../../UI/ModalBtns/ModalBtns";
import {loginThunk} from "../../thunks/userThunks";

function LoginPopup() {
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    const hidePopup = () => {
        dispatch(changeShowAuthenticationPopup(false))
    }

    const login = (e) => {
        e.preventDefault()

        dispatch(loginThunk({ data: loginData }))
    }

    const onChange = (e) => {
        setLoginData((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    return (
        <>
            <div className={c.block} onClick={hidePopup}>

                <Popup onClick={e => e.stopPropagation()} className={c.content}>
                    <ModalTitle>Авторизуйтесь</ModalTitle>

                    <form onSubmit={(e) => login(e)} className={c.form}>
                        <FormControl labelText={'Логин'}>
                            <Input name={'username'} value={loginData.username} onChange={onChange} />
                        </FormControl>
                        <FormControl labelText={'Пароль'}>
                            <Input name={'password'} value={loginData.password} onChange={onChange} type={'password'} />
                        </FormControl>

                        <div className={c.btns}>
                            <ModalBtns onCancel={hidePopup} confirmBtnText={'Логин'} />
                        </div>
                    </form>

                </Popup>
            </div>

            <div className={c.blur}></div>
        </>
    );
}

export default LoginPopup;