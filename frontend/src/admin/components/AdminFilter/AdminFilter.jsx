import React from 'react';
import c from './AdminFilter.module.scss'

function AdminFilter({ onAddProduct, onSearch, searchValue }) {

    return (
        <div className={c.component}>
            <div className={c.left}>
                <ul className={c.list}>
                    <li className={c.item}>Сортировать по:</li>
                    <li className={c.item}>Все</li>
                </ul>
            </div>
            <div className={c.right}>
                <div className={c.btns}>
                    <input onChange={onSearch} value={searchValue} className={c.input} type="text" placeholder={'Поиск'} />
                    <button className={c.btn} onClick={onAddProduct}>Добавить товар</button>
                </div>
            </div>
        </div>
    );
}

export default AdminFilter;