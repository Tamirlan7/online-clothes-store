import React, {useRef} from 'react';
import c from './AdminMenu.module.scss'
import {Link, useLocation} from "react-router-dom";
import Account from "../Account/Account";
import adminMenu from "../../../data/adminMenu";


function AdminMenu() {
    const componentRef = useRef()
    const {pathname} = useLocation()

    return (
        <div
            ref={componentRef}
            className={c.component}
        >
            <div className={c.block}>
                <ul className={c.menu}>
                    {adminMenu.map((navItem) => (
                        <li key={navItem.link} className={pathname === navItem.link ? `${c['menu-item']} ${c['menu-item__selected']}` : `${c['menu-item']}`}>
                            <Link to={navItem.link} role={'button'}
                                  className={pathname === navItem.link ? `${c['menu-link']} ${c['menu-link__selected']}` : `${c['menu-link']}`}>
                                <figure className={pathname === navItem.link ? `${c.icon} ${c['icon-selected']}` : c.icon}>{navItem.suffixIcon}</figure>
                                <span>{navItem.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <Account/>
            </div>

            <div className={c['aside-separator']}/>

        </div>
    );
}

export default AdminMenu;