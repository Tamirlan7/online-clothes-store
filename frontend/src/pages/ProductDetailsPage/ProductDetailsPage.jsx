import React, {useEffect, useMemo, useState} from "react";
import c from './ProductDetailsPage.module.scss'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProductByIdThunk} from "../../thunks/productThunks";
import {API_URL} from "../../constants/AppConstants";
import Container from "../../components/Container/Container";
import bg from '../../assets/images/card-upper-image.png'
import LineThrough from "../../UI/LineThrough/LineThrough";
import {addProductToCart, showCart} from "../../slices/cartSlice";
import sizes from "../../data/sizes";

export default function ProductDetailsPage() {
    const dispatch = useDispatch()
    const {currentProduct} = useSelector(state => state.product)
    const {productId} = useParams();
    const [selectedSize, setSelectedSize] = useState({
        'size': null,
        'quantity': 1,
    })
    const [isCounter, setIsCounter] = useState(false)
    const [currentImageIdx, setCurrentImageIdx] = useState(0)
    const currentMainImage = useMemo(
        () => `${API_URL}/product/${currentProduct?.id}/file/${currentProduct?.productMediaFiles[currentImageIdx].name}`,
        [currentImageIdx, currentProduct?.id, currentProduct?.productMediaFiles])
    const onImageClick = idx => setCurrentImageIdx(idx)

    useEffect(() => {
        if (currentProduct?.id !== parseInt(productId)) {
            dispatch(getProductByIdThunk(productId))
        }

    }, [currentProduct?.id, dispatch, productId])

    const handleOnSizeClick = (s) => {
        setSelectedSize((prev) => ({ ...prev, size: s?.size  }))
    }

    const handleClickOnBuyBtn = () => {
        if (selectedSize.size) {
            setIsCounter(true)
            setSelectedSize((prev) => ({...prev, quantity: 1}))
            dispatch(showCart());
            dispatch(addProductToCart({
                ...currentProduct,
                id: `${currentProduct.id}:${selectedSize.size}`,
                size: {
                    name: selectedSize.size,
                    quantity: selectedSize.quantity,
                },
                actualPrice: currentProduct.priceWithDiscount > 0 ? currentProduct.priceWithDiscount : currentProduct.price,
            }))
        }
    }

    if (!currentProduct) {
        return <></>
    }

    return (
        <div className={c.block}>

            <div className={c.bg} style={{backgroundImage: `url(${bg})`}}/>

            <Container style={{padding: 0}}>
                <div className={c['inner-block']}>

                    <div className={c.content}>
                        <div className={c.left}>

                            {(Array.isArray(currentProduct.productMediaFiles)
                                && currentProduct.productMediaFiles.length) && (
                                <>
                                    <div className={c['main-image']}>
                                        <img src={currentMainImage} alt="card"/>
                                    </div>

                                    <ul className={c.images}>
                                        {currentProduct.productMediaFiles.map((file, idx) => (
                                            <li key={idx} onClick={() => onImageClick(idx)} className={c.image}>
                                                <img src={`${API_URL}/product/${currentProduct?.id}/file/${file.name}`}
                                                     alt="card"/>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                        </div>

                        <div className={c.right}>
                            <h2 className={c.title}>{currentProduct.name}</h2>
                            <div className={c.pairs}>
                                <div className={c.pair}>
                                    <span className={c.key}>Коллекция:</span>
                                    <span className={c.value}>{currentProduct.collection?.name}</span>
                                </div>
                                <div className={c.pair}>
                                    <span className={c.key}>Артикул:</span>
                                    <span className={c.value}>{currentProduct.clothingType?.name}</span>
                                </div>
                                {(currentProduct?.dimension && currentProduct?.weight) && (
                                    <div className={c.chrs}>
                                        <div className={`${c.key} ${c.pair}`}>Характеристики:</div>
                                        <div>
                                            {currentProduct?.dimension && (
                                                <div className={c.pair}>
                                                    <span className={c.value}>ДxШxВ:</span>
                                                    <span className={c.value}>{currentProduct.dimension}</span>
                                                </div>
                                            )}
                                            {currentProduct?.weight && (
                                                <div className={c.pair}>
                                                    <span className={c.value}>Вес:</span>
                                                    <span className={c.value}>{currentProduct.weight}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={`${c.pair} ${c['price-block']}`}>
                                {currentProduct.priceWithDiscount > 0 ? (
                                    <>
                                        <h2 className={`${c.price} ${c.title} ${c.key}`}>{currentProduct.priceWithDiscount} р.</h2>
                                        <span className={`${c['old-price']}`}>
                                            <LineThrough>{currentProduct.price} р.</LineThrough>
                                        </span>
                                    </>
                                ) : (
                                    <h2 className={`${c.price} ${c.title} ${c.key}`}>{currentProduct.price} р.</h2>
                                )}
                            </div>

                            <ul className={c.sizes}>
                                {currentProduct?.productSizes?.map((s) => (
                                    <li onClick={() => handleOnSizeClick(s)} className={c['size-item']} key={s?.id}>
                                        <span className={
                                            `${c.size} ${c.font24} 
                                            ${s.size === selectedSize.size && (`${c['size-selected']}`)}
                                            `}>
                                            {s?.size}
                                        </span>
                                        <span className={c.quantity}>Осталось {s.quantity}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={c.btns}>
                                <button onClick={handleClickOnBuyBtn} className={`${c.font24} ${c.btn}`}>КУПИТЬ</button>
                            </div>

                            {currentProduct.preOrder && (
                                <div className={c['pre-oder']}>
                                    <p className={`${c['pre-order-wrapper']} ${c.font20}`}>
                                        Новый предзаказ открыт до 10 января. Отправка будет осуществляться в течение
                                        7-10
                                        рабочих дней после закрытия предзаказа.
                                    </p>
                                </div>
                            )}

                            <div className={`${c.description} ${c.font20}`}>
                                {'Джерси сделана из нестандартного материала - двухсторонний флис.Плотность материала - 270гр, внутри имеется небольшой начёс. Установлены фиксаторы на рукавах и снизу изделия. \n В комплекте с изделием идёт карта с QR-кодом, на источник с информацией по уходу и стикер.'}
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    )
        ;
}
