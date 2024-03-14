import React, {useEffect, useRef, useState} from 'react';
import c from './LoginPopup.module.scss'
import Popup from "../../UI/Popup/Popup";
import {useDispatch, useSelector} from "react-redux";
import {changeShowAuthenticationPopup} from "../../slices/userSlice";
import ModalTitle from "../../UI/ModalTitle/ModalTitle";
import ModalBtns from "../../UI/ModalBtns/ModalBtns";
import {loginThunk} from "../../thunks/userThunks";
import {useLocation, useNavigate} from "react-router-dom";
import {TOKENS} from "../../constants/AppConstants";
import Form from "../../UI/Form/Form";
import telegramLoginBtn from '../../assets/images/telegram_login_btn.png'
import FormControl from "../../UI/FormControl/FormControl";
import Input from "../../UI/Input/Input";

function LoginPopup() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const tokens = JSON.parse(localStorage.getItem(TOKENS)) ?? {}
    const {loading} = useSelector(state => state.user)
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        if (!loading && location.state?.redirected && tokens.accessToken) {
            navigate(location.state.from)
        }
    }, [loading, location, navigate, tokens.accessToken])

    const hidePopup = () => {
        dispatch(changeShowAuthenticationPopup(false))
    }

    const login = () => {
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

                    <Form onSubmit={(e) => login(e)} className={c.form}>
                        <FormControl labelText={'Логин'}>
                            <Input name={'username'} value={loginData.username} onChange={onChange} />
                        </FormControl>
                        <FormControl labelText={'Пароль'}>
                            <Input name={'password'} value={loginData.password} onChange={onChange} type={'password'} />
                        </FormControl>

                        <div className={c.btns}>
                            <ModalBtns onCancel={hidePopup} confirmBtnText={'Логин'} />
                            {/*<img src={telegramLoginBtn} alt={'login'} />*/}
                        </div>
                    </Form>

                </Popup>
            </div>

            <div className={c.blur}></div>
        </>
    );
}

export default LoginPopup;


// import React, {useEffect, useRef, useState} from 'react';
// import c from './LoginPopup.module.scss'
// import Popup from "../../UI/Popup/Popup";
// import {useDispatch, useSelector} from "react-redux";
// import {changeShowAuthenticationPopup} from "../../slices/userSlice";
// import ModalTitle from "../../UI/ModalTitle/ModalTitle";
// import ModalBtns from "../../UI/ModalBtns/ModalBtns";
// import {loginThunk} from "../../thunks/userThunks";
// import {useLocation, useNavigate} from "react-router-dom";
// import {TOKENS} from "../../constants/AppConstants";
// import Form from "../../UI/Form/Form";
// import telegramLoginBtn from '../../assets/images/telegram_login_btn.png'
//
// function LoginPopup() {
//     const btnsRef = useRef(null);
//     const dispatch = useDispatch()
//     const location = useLocation()
//     const navigate = useNavigate()
//     const tokens = JSON.parse(localStorage.getItem(TOKENS)) ?? {}
//     const {loading} = useSelector(state => state.user)
//     const [loginData, setLoginData] = useState({
//         username: '',
//         password: '',
//     })
//
//     function handleTelegramResponse(user) {
//         console.log('SOMETHING')
//         console.log(user)
//     }
//
//     useEffect(() => {
//         if (btnsRef.current) {
//             window.TelegramLoginWidget = {
//                 callbackOnAuth: handleTelegramResponse
//             }
//
//             const scriptElement = document.createElement('script');
//             scriptElement.src = 'https://telegram.org/js/telegram-widget.js?22';
//             scriptElement.setAttribute('data-telegram-login', 'uncwear_bot');
//             scriptElement.setAttribute('data-size', 'large');
//             scriptElement.setAttribute('data-onauth', 'TelegramLoginWidget.callbackOnAuth(user)');
//             scriptElement.async = true;
//
//
//             btnsRef.current.appendChild(scriptElement)
//         }
//     }, [])
//
//     useEffect(() => {
//         if (!loading && location.state?.redirected && tokens.accessToken) {
//             navigate(location.state.from)
//         }
//     }, [loading, location, navigate, tokens.accessToken])
//
//     const hidePopup = () => {
//         dispatch(changeShowAuthenticationPopup(false))
//     }
//
//     const login = (e) => {
//         dispatch(loginThunk({ data: loginData }))
//     }
//
//     const onChange = (e) => {
//         setLoginData((prev) => ({...prev, [e.target.name]: e.target.value}))
//     }
//
//     return (
//         <>
//             <div className={c.block} onClick={hidePopup}>
//
//                 <Popup onClick={e => e.stopPropagation()} className={c.content}>
//
//
//                     <ModalTitle>Авторизуйтесь</ModalTitle>
//
//                     <Form onSubmit={(e) => login(e)} className={c.form}>
//                         {/*<FormControl labelText={'Логин'}>*/}
//                         {/*    <Input name={'username'} value={loginData.username} onChange={onChange} />*/}
//                         {/*</FormControl>*/}
//                         {/*<FormControl labelText={'Пароль'}>*/}
//                         {/*    <Input name={'password'} value={loginData.password} onChange={onChange} type={'password'} />*/}
//                         {/*</FormControl>*/}
//
//                         <div className={c.btns} ref={btnsRef}>
//                         </div>
//                     </Form>
//
//                 </Popup>
//             </div>
//
//             <div className={c.blur}></div>
//         </>
//     );
// }
//
// export default LoginPopup;