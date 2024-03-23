import React, {useMemo} from 'react';
import c from './ProductsTableRow.module.scss'
import cTable from '../ProductsTable/ProductsTable.module.scss'
import {ReactComponent as TableDots} from "../../../assets/icons/table-dots.svg";
import {ReactComponent as Copy} from "../../../assets/icons/copy.svg";
import {ReactComponent as Trash} from "../../../assets/icons/trash.svg";
import Switch from "../../../UI/Switch/Switch";
import {API_URL} from "../../../constants/AppConstants";
import {useDispatch, useSelector} from "react-redux";
import {copyProductThunk} from "../../../thunks/productThunks";
import {Input, Select} from "antd";
import TextArea from "antd/es/input/TextArea";


function ProductsTableRow(product) {
    const dispatch = useDispatch()
    const {collections} = useSelector(state => state.collection)

    const {
        id,
        name,
        collection,
        productMediaFiles,
        productSizes,
        price,
        visible,
        preOrder,
        priceWithDiscount,
        checked,
        onRowChecked,
        onVisibleChange,
        onPreOrderChange,
        onDeleteProduct,
        onPriceChanged,
        onPriceWithDiscountChanged,
        onDescriptionClicked,
        onNameChanged,
        onCollectionChanged,
    } = product ?? {}

    const quantity = useMemo(() => {
        return productSizes.reduce((acc, s) => acc + s.quantity, 0);
    }, [productSizes])

    const onCopy = () => {
        dispatch(copyProductThunk({id}))
    }

    return (
        <tr className={c.row}>
            <td className={`${c.cell} ${cTable['limited-cell-100']}`}>
                <div className={c.checkbox}>
                    <figure><TableDots/></figure>
                    {checked}
                    <input type="checkbox" onChange={(e) => onRowChecked(id, e)} checked={checked}/>
                </div>
            </td>
            <td className={`${c.cell} ${cTable['limited-cell-121']}`}>
                <img className={c.image} src={`${API_URL}/product/${id}/file/${productMediaFiles[0]?.name}`}
                     alt="product"/>
            </td>
            <td className={`${c.cell} ${cTable['priority-cell']}`}>
                <div className={c['name-inner-cell']}>
                    <TextArea
                        variant={'borderless'}
                        value={name}
                        onChange={(val) => {
                            if (onNameChanged) {
                                onNameChanged(product, val)
                            }
                        }}
                        rootClassName={c['textarea-name']}
                        style={{fontFamily: 'inherit', resize: 'none', padding: 0, overflow: 'hidden'}}
                    />
                    <div className={c.options}>
                        <div>4 варианта</div>
                        <span>+</span>
                    </div>
                </div>
            </td>
            <td className={`${c.cell} ${cTable['priority-cell']}`}>
                <button className={c['description-btn']} onClick={() => onDescriptionClicked(product)}>Открыть
                    описание
                </button>
            </td>
            <td className={c.cell}>
                <Select
                    style={{width: '100%'}}
                    onChange={(val) => {
                        if (onCollectionChanged) {
                            onCollectionChanged(product, val)
                        }
                    }}
                    suffixIcon={<></>}
                    value={collection?.name ?? 'Не выбран'}
                    variant={'borderless'}
                    options={[
                        ...collections.map(c => ({label: c?.name, value: c?.name}))
                    ]}
                />
            </td>
            <td className={`${c.cell} ${cTable['centered-cell']}`}>
                <Input
                    variant={'borderless'}
                    value={price}
                    onChange={(val) => {
                        if (onPriceChanged) {
                            onPriceChanged(product, val)
                        }
                    }}
                    style={{fontFamily: 'inherit', textAlign: 'center'}}
                />
            </td>
            <td className={`${c.cell} ${cTable['centered-cell']}`}>
                <Input
                    variant={'borderless'}
                    value={priceWithDiscount}
                    onChange={(val) => {
                        if (onPriceWithDiscountChanged) {
                            onPriceWithDiscountChanged(product, val)
                        }
                    }}
                    style={{fontFamily: 'inherit', textAlign: 'center'}}
                />
            </td>
            <td className={`${c.cell} ${cTable['centered-cell']}`}>
                <div>{quantity}</div>
            </td>
            <td className={`${c.cell} ${cTable['limited-cell-83']} ${cTable['centered-cell']}`}>
                <figure style={{cursor: "pointer"}} onClick={onCopy}><Copy/></figure>
            </td>
            <td className={`${c.cell} ${cTable['limited-c ell-83']} ${cTable['centered-cell']}`}>
                <Switch onSwitch={(val) => {
                    if (onPreOrderChange) {
                        onPreOrderChange(product, val)
                    }
                }} switched={preOrder}/>
            </td>
            <td className={`${c.cell} ${cTable['limited-c ell-83']} ${cTable['centered-cell']}`}>
                <Switch onSwitch={(val) => {
                    if (onVisibleChange) {
                        onVisibleChange(product, val)
                    }
                }} switched={visible}/>
            </td>
            <td className={`${c.cell} ${cTable['limited-cell-83']} ${cTable['centered-cell']}`}
                onClick={() => onDeleteProduct(product)}>
                <figure style={{cursor: "pointer"}}><Trash/></figure>
            </td>
        </tr>
    );
}

export default ProductsTableRow;