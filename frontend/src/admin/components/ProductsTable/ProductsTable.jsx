import React, {useEffect, useState} from 'react';
import c from './ProductsTable.module.scss'
import ProductsTableRow from "../ProductsTableRow/ProductsTableRow";
import {useSelector} from "react-redux";
import Loader from "../../../UI/Loader/Loader";
import Message from "../../../UI/Message/Message";

function ProductsTable({products}) {
    const {loading} = useSelector(state => state.product)
    const [checked, setChecked] = useState(false)
    const [transformedProducts, setTransformedProducts] = useState([])

    useEffect(() => {
        setTransformedProducts(products?.map(p => ({...p, checked})))
    }, [checked, products])

    const onColumnChecked = (e) => {
        setChecked(e.target.checked)
    }

    const onRowChecked = (id, e) => {
        setTransformedProducts((prev) => {
            return prev.map(p => {
                if (p.id === id) {
                    p.checked = e.target.checked
                }

                return p
            })
        })
    }

    return (
        <table className={c.table}>
            <thead>
            <tr className={c['header-row']}>
                <td className={`${c.cell} ${c['limited-cell-100']}`}>
                    <div className={c.checkbox}>
                        <figure style={{width: 16, height: 22}}></figure>
                        <input checked={checked} type="checkbox" onChange={(e) => onColumnChecked(e)}/>
                    </div>
                </td>
                <td className={`${c.cell} ${c['limited-cell-121']}`}>Фото</td>
                <td className={`${c.cell} ${c['priority-cell']}`}>Название</td>
                <td className={`${c.cell} ${c['priority-cell']}`}>Описание</td>
                <td className={c.cell}>Коллекция</td>
                <td className={`${c.cell} ${c['centered-cell']}`}>Цена</td>
                <td className={`${c.cell} ${c['centered-cell']}`}>Скидка</td>
                <td className={c.cell}>Кол-во</td>
                <td className={`${c.cell} ${c['limited-cell-83']}`}>Дубл.</td>
                <td className={`${c.cell} ${c['limited-cell-83']}`}>Предзаказ</td>
                <td className={`${c.cell} ${c['limited-cell-83']}`}>Видимость</td>
                <td className={`${c.cell} ${c['limited-cell-83']}`}>Удалить</td>
            </tr>
            </thead>

            <tbody>
            {
                loading ? (
                    <Loader/>
                ) : (
                    <>{transformedProducts?.map((p) => (
                        <ProductsTableRow key={p.id} onRowChecked={onRowChecked} {...p} />
                    ))}</>
                )}

            {(!products?.length && !loading) ? (
                <Message className={c.message}>Список товаров пуст...</Message>
            ) : <></>}
            </tbody>
        </table>
    );
}

export default ProductsTable;