import React from 'react';
import c from './Account.module.scss'
import { ReactComponent as User } from '../../../assets/icons/user.svg'
import { ReactComponent as Logout } from '../../../assets/icons/log-out.svg'
import logout from "../../../utils/logout";
import {useDispatch} from "react-redux";
import {changeShowAuthenticationPopup} from "../../../slices/userSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {UNAUTHENTICATED_ENTRY} from "../../../constants/AppConstants";
function Account() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onLogout = () => {
        logout()
        navigate(UNAUTHENTICATED_ENTRY, {
            state: {
                redirected: true,
                from: pathname,
            }
        })
        dispatch(changeShowAuthenticationPopup(true))
    }

    return (
        <div className={c['user']}>
            <div className={c.divider}/>

            <div className={c['user-block']}>
                <div className={c['user-inner-block']}>

                    <div className={c['ava-block']}>
                        <div className={c['ava-wrapper']}>
                            <figure className={c.icon}><User/></figure>
                        </div>

                        <div className={c['user-info']}>
                            <span className={c['user-text']}>Мой аккаунт</span>
                            <span className={`${c['user-text']} ${c.name}`}>Александр А.</span>
                        </div>
                    </div>

                    <figure onClick={() => onLogout()} className={`${c.icon} ${c.logout}`}><Logout/></figure>
                </div>
            </div>
        </div>
    );
}

export default Account;