import React from 'react';
import c from './AdminEmployeesPage.module.scss'
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import AdminList from "./components/AdminList/AdminList";
import AdminEmployeeHeader from "./components/AdminEmployeeHeader/AdminEmployeeHeader";

function AdminEmployeesPage() {
    return (
        <div className={c.block}>
            <AdminMenu/>

            <div className={c.main}>
                <div className={c.header}>
                    <AdminEmployeeHeader />
                </div>

                <div className={c.content}>
                    <AdminList title={'Супер Администраторы'} />
                    <AdminList title={'Администраторы'} />
                </div>
            </div>
    </div>
    );
}

export default AdminEmployeesPage;