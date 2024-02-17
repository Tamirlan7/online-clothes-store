import React, {useMemo} from 'react';
import c from './CartItem.module.scss'
import {ReactComponent as OrderRemove} from '../../assets/icons/order-remove.svg'
import Counter from "../../UI/Counter/Counter";
import {useDispatch} from "react-redux";
import {changeProductQuantity, removeProductFromCart} from "../../slices/cartSlice";
import {API_URL} from "../../constants/AppConstants";

function CartItem({item}) {
    const dispatch = useDispatch()

    const {
        id,
        name,
        clothingType,
        actualPrice,
        size,
        productMediaFiles,
    } = item

    const actualId = useMemo(() => {
        return id.split(':')[0]
    }, [id])

    const handleSizeOnChange = val => {
        dispatch(changeProductQuantity({
            ...item,
            size: {
                name: size.name,
                quantity: val,
            }
        }))
    }

    const handleOnRemove = () => {
        dispatch(removeProductFromCart(id))
    }

    return (
        <div className={c.block}>
            <div className={c.preview}>
                {productMediaFiles.length ? (
                    <img src={`${API_URL}/product/${actualId}/file/${productMediaFiles[0].name}`} alt="product"/>
                ) : <></>}
            </div>
            <div className={c['product-info']}>
                <p className={c.name}>{name}</p>
                <div className={c.size}>
                    <span className={c['size-name']}>Размер:</span>
                    <span className={c['size-value']}>{size?.name}</span>
                </div>
                <span className={c['clothing-type']}>{clothingType?.name}</span>
            </div>

            <Counter rootClassName={c.counter} value={size?.quantity} onChange={handleSizeOnChange}/>

            <p className={c.price}>{actualPrice * size.quantity} р.</p>
            <figure onClick={handleOnRemove} className={c.remove}>
                <OrderRemove/>
            </figure>
        </div>
    );
}

export default CartItem;