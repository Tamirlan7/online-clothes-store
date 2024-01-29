import React from 'react';
import c from './AdminPage.module.scss'
import AdminAside from "../../components/AdminAside/AdminAside";
import AdminCatalog from "../../components/AdminCatalog/AdminCatalog";

function AdminPage() {

    console.log('something')

    return (
        <div className={c.page}>
            <AdminAside />
            <AdminCatalog />
        </div>
    );
}

export default AdminPage;