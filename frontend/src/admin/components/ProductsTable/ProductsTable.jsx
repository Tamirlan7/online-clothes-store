import React, {useEffect, useMemo, useState} from 'react';
import c from './ProductsTable.module.scss'
import ProductsTableRow from "../ProductsTableRow/ProductsTableRow";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../UI/Loader/Loader";
import Message from "../../../UI/Message/Message";
import {changeShowConfirmAction} from "../../../slices/productSlice";
import ConfirmAction from "../ConfirmAction/ConfirmAction";
import {updateProductsThunk} from "../../../thunks/productThunks";
import ProductDeleteModal from "../../modals/ProductDeleteModal/ProductDeleteModal";
import ProductDescriptionModal from "../../modals/ProductDescriptionModal/ProductDescriptionModal";


function ProductsTable({products}) {
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.product)
    const [checked, setChecked] = useState(false)
    const [transformedProducts, setTransformedProducts] = useState([])
    const [deleteProduct, setDeleteProduct] = useState({})
    const [deleteModal, setDeleteModal] = useState(false)
    const [descriptionModal, setDescriptionModal] = useState(false)
    const [descriptionModalProduct, setDescriptionModalProduct] = useState({})

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
    const changesExist = useMemo(() => {
        if (Array.isArray(transformedProducts)) {
            for (let tp of transformedProducts) {
                const p = products.find(p => p.id === tp.id)

                if (p) {
                    if (tp.visible !== p.visible ||
                        tp.preOrder !== p.preOrder ||
                        tp.price !== p.price ||
                        tp.priceWithDiscount !== p.priceWithDiscount ||
                        tp.name !== p.name
                    ) {
                        return true
                    }
                }
            }
        }
    }, [transformedProducts, products])

    useEffect(() => {
        changesExist ? showConfirmAction() : hideConfirmAction();
    }, [changesExist, showConfirmAction, hideConfirmAction])

    function showConfirmAction() {
        dispatch(changeShowConfirmAction(true))
    }

    const onDeleteProduct = p => {
        setDeleteProduct(p)
        setDeleteModal(true)
    }

    function hideConfirmAction() {
        dispatch(changeShowConfirmAction(false))
    }


    const onVisibleChange = (p, val) => {
        setTransformedProducts((prev) => [...prev.map(cp => {
            if (cp.id === p.id) {
                cp.visible = val
            }

            return cp
        })])
    }

    const onPriceChanged = (p, e) => {
        setTransformedProducts((prev) => [...prev.map(cp => {
            if (cp.id === p.id) {
                cp.price = Number(e.target.value)
            }

            return cp
        })])
    }

    const onPriceWithDiscountChanged = (p, e) => {
        setTransformedProducts((prev) => [...prev.map(cp => {
            if (cp.id === p.id) {
                cp.priceWithDiscount = Number(e.target.value)
            }

            return cp
        })])
    }

    const onPreOrderChange = (p, val) => {
        setTransformedProducts((prev) => [...prev.map(cp => {
            if (cp.id === p.id) {
                cp.preOrder = val
            }

            return cp
        })])
    }

    function updateProducts() {
        let data = []

        if (Array.isArray(transformedProducts)) {
            for (let tp of transformedProducts) {
                const p = products.find(p => p.id === tp.id)

                if (p) {
                    const updatedProduct = {}

                    if (tp.visible !== p.visible) {
                        updatedProduct.visible = tp.visible
                        updatedProduct.visibleChanged = true;
                    }

                    if (tp.preOrder !== p.preOrder) {
                        updatedProduct.preOrder = tp.preOrder
                        updatedProduct.preOrderChanged = true;
                    }

                    if (tp.price !== p.price) {
                        updatedProduct.price = tp.price
                    }

                    if (tp.priceWithDiscount !== p.priceWithDiscount) {
                        updatedProduct.priceWithDiscount = tp.priceWithDiscount
                    }

                    if (tp.name !== p.name) {
                        updatedProduct.name = tp.name
                    }


                    if (Object.keys(updatedProduct).length) {
                        updatedProduct.id = tp.id
                        data.push(updatedProduct)
                    }
                }
            }
        }


        dispatch(updateProductsThunk({
            data,
        }))
    }

    const onNameChanged = (p, e) => {
        setTransformedProducts((prev) => [...prev.map(cp => {
            if (cp.id === p.id) {
                cp.name = e.target.value
            }

            return cp
        })])
    }

    const onDescriptionClicked = (p) => {
        setDescriptionModal(true)
        setDescriptionModalProduct(p)
    }

    return (
        <>
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
                {!loading && (
                    <>{transformedProducts?.map((p) => (
                        <ProductsTableRow
                            key={p.id}
                            onRowChecked={onRowChecked}
                            onPreOrderChange={onPreOrderChange}
                            onVisibleChange={onVisibleChange}
                            onDeleteProduct={onDeleteProduct}
                            onPriceChanged={onPriceChanged}
                            onPriceWithDiscountChanged={onPriceWithDiscountChanged}
                            onDescriptionClicked={onDescriptionClicked}
                            onNameChanged={onNameChanged}
                            {...p}
                        />
                    ))}</>
                )}
                </tbody>
            </table>

            {loading && (
                <div className={c.loader}>
                    <Loader/>
                </div>
            )}

            {(!products?.length && !loading) ? (
                <Message className={c.message}>Список товаров пуст...</Message>
            ) : <></>}

            <ConfirmAction onConfirm={updateProducts}/>

            <ProductDeleteModal
                product={deleteProduct}
                isActive={deleteModal}
                setIsActive={setDeleteModal}
            />

            <ProductDescriptionModal
                isActive={descriptionModal}
                setIsActive={setDescriptionModal}
                product={descriptionModalProduct}
            />
        </>
    );
}

export default ProductsTable;