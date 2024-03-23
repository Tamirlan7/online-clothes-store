import React from 'react';
import c from './AdminEmployeeHeader.module.scss'
import AdminCard from "../AdminCard/AdminCard";

function AdminEmployeeHeader() {
    return (
        <div className={c.header}>
            <div className={c.inner}>
                <div className={c.left}>
                    <AdminCard me/>
                </div>
                <div className={c.right}>
                    <div className={c.btns}>
                        <button className={c.btn}>Добавить редактора</button>
                        <button className={c.btn}>Добавить Администратора</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminEmployeeHeader;