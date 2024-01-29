import React from 'react';
import c from './AdminCatalog.module.scss'
import AdminFilter from "../AdminFilter/AdminFilter";

function AdminCatalog() {
    return (
        <div className={c.component}>
            <div>
                <AdminFilter />
            </div>
        </div>
    );
}

export default AdminCatalog;