import React, {useEffect, useRef} from 'react';
import c from './AdminMenu.module.scss'
import {Link} from "react-router-dom";
import { ReactComponent as Catalog } from '../../../assets/icons/carbon_catalog.svg'
import { ReactComponent as BookContent } from '../../../assets/icons/bx_book-content.svg'
import { ReactComponent as User } from '../../../assets/icons/user.svg'
import { ReactComponent as Logout } from '../../../assets/icons/log-out.svg'

function AdminMenu() {
    const componentRef = useRef()

    return (
        <div
            ref={componentRef}
            className={c.component}
        >
            <div className={c.block}>
                <ul className={c.menu}>
                    <li className={`${c['menu-item']} ${c['menu-item__selected']}`}>
                        <Link to={'/admin'} role={'button'} className={`${c['menu-link']} ${c['menu-link__selected']}`}>
                            <figure className={c.icon}><Catalog/></figure>
                            <span>Каталог</span>
                        </Link>
                    </li>
                    <li className={c['menu-item']}>
                        <Link to={'/admin'} role={'button'} className={c['menu-link']}>
                            <figure className={c.icon}><BookContent/></figure>
                            <span>Контент страниц</span>
                        </Link>
                    </li>
                </ul>

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

                            <figure className={`${c.icon} ${c.logout}`}><Logout/></figure>
                        </div>
                    </div>
                </div>

            </div>

            <div className={c['aside-separator']}/>
        </div>
    );
}

export default AdminMenu;