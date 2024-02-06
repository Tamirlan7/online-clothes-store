import React, {useRef} from 'react';
import c from './AdminMenu.module.scss'
import {Link} from "react-router-dom";
import { ReactComponent as Catalog } from '../../../assets/icons/carbon_catalog.svg'
import { ReactComponent as BookContent } from '../../../assets/icons/bx_book-content.svg'
import Account from "../Account/Account";


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

                <Account />
            </div>

            <div className={c['aside-separator']}/>

        </div>
    );
}

export default AdminMenu;