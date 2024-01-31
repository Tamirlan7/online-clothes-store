import React from 'react';
import c from './ProductsTable.module.scss'
import ProductsTableRow from "../ProductsTableRow/ProductsTableRow";

function ProductsTable() {
    return (
        <div className={c.table}>
            <div className={c.header}>
                <div className={`${c['header-row']}`}>
                    <div className={`${c['header-cell']} ${c['checkbox-cell']}`}></div>
                    <div className={`${c['header-cell']} ${c['image-cell']}`}>Фото</div>
                    <div className={`${c['header-cell']} ${c['name-cell']}`}>Название</div>
                    <div className={`${c['header-cell']} ${c['description-cell']}`}>Описание</div>
                    <div className={`${c['header-cell']} ${c['collection-cell']}`}>Коллекция</div>
                    <div className={`${c['header-cell']} ${c['price-cell']}`}>Цена</div>
                    <div className={`${c['header-cell']} ${c['discount-cell']}`}>Скидка</div>
                    <div className={`${c['header-cell']} ${c['count-cell']}`}>Кол-во</div>
                    <div className={`${c['header-cell']} ${c['copy-cell']}`}>Дубл.</div>
                    <div className={`${c['header-cell']} ${c['visible-cell']}`}>Видимость</div>
                    <div className={`${c['header-cell']} ${c['delete-cell']}`}>Удалить</div>
                </div>
            </div>

            <ul className={c.body}>
                <li className={c.row}>
                    <ProductsTableRow/>
                </li>
                <li className={c.row}>
                    <ProductsTableRow/>
                </li>
            </ul>

            <div className={c.pagination}>

            </div>
        </div>
    );
}

export default ProductsTable;