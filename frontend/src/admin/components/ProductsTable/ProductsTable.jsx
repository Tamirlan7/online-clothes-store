import React from 'react';
import c from './ProductsTable.module.scss'
import ProductsTableRow from "../ProductsTableRow/ProductsTableRow";

function ProductsTable({ products }) {
    return (
        <table className={c.table}>
            <thead>
                <tr className={c['header-row']}>
                    <td className={`${c.cell} ${c['limited-cell-100']}`}>Чекбокс</td>
                    <td className={`${c.cell} ${c['limited-cell-121']}`}>Фото</td>
                    <td className={`${c.cell} ${c['priority-cell']}`}>Название</td>
                    <td className={`${c.cell} ${c['priority-cell']}`}>Описание</td>
                    <td className={c.cell}>Коллекция</td>
                    <td className={c.cell}>Цена</td>
                    <td className={c.cell}>Скидка</td>
                    <td className={c.cell}>Кол-во</td>
                    <td className={`${c.cell} ${c['limited-cell-83']}`}>Дубл.</td>
                    <td className={`${c.cell} ${c['limited-cell-83']}`}>Видимость</td>
                    <td className={`${c.cell} ${c['limited-cell-83']}`}>Удалить</td>
                </tr>
            </thead>

            <tbody>
                {products?.map((p) => (
                    <ProductsTableRow key={p.id} {...p} />
                ))}
            </tbody>
        </table>
    );
}

export default ProductsTable;