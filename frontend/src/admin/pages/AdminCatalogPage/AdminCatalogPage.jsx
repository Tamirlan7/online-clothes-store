import React from 'react';
import c from './AdminCatalogPage.module.scss'
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import AdminFilter from "../../components/AdminFilter/AdminFilter";
import ProductsTable from "../../components/ProductsTable/ProductsTable";

function AdminCatalogPage() {

    console.log('something')

    return (
        <div className={c.page}>
            <AdminMenu/>

            <div className={c.content}>
                <AdminFilter/>
                <div className={c.table}>
                    <ProductsTable />
                </div>
            </div>
        </div>
    );
}

export default AdminCatalogPage;