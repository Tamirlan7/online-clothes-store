import React from 'react';
import c from './AdminFilter.module.scss'

function AdminFilter() {
    return (
        <div className={c.component}>
            <div className={c.left}>
                <ul className={c.list}>
                    <li className={c.item}>Сортировать по:</li>
                    <li className={c.item}>Все</li>
                    <li className={c.item}>T-shirts/long</li>
                    <li className={c.item}>Jersey</li>
                    <li className={c.item}>Hoodie/Zip-hoodie</li>
                    <li className={c.item}>Pants/Shorts</li>
                </ul>
            </div>
            <div className={c.right}>
                <div className={c.btns}>
                    <input className={c.input} type="text" placeholder={'Поиск'} />
                    <button className={c.btn}>Добавить товар</button>
                </div>
            </div>
        </div>
    );
}

export default AdminFilter;