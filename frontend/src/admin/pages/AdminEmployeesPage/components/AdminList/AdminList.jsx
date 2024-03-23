import React from 'react';
import c from './AdminList.module.scss'
import CardSectionTitle from "../CardSectionTitle/CardSectionTitle";
import AdminCard from "../AdminCard/AdminCard";

function AdminList({title, admins}) {
    return (
        <div className={c.block}>
            <CardSectionTitle className={c.title}>{title}</CardSectionTitle>

            <ul className={c.list}>
                <li className={c.item}>
                    <AdminCard/>
                </li>
                <li className={c.item}>
                    <AdminCard/>
                </li>
                <li className={c.item}>
                    <AdminCard/>
                </li>
                <li className={c.item}>
                    <AdminCard/>
                </li>
                <li className={c.item}>
                    <AdminCard/>
                </li>
                <li className={c.item}>
                    <AdminCard/>
                </li>
            </ul>
        </div>
    );
}

export default AdminList;