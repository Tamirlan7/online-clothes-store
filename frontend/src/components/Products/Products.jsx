import React, {useCallback, useMemo, useRef} from 'react';
import c from './Products.module.scss'
import ProductCard from "../ProductCard/ProductCard";
import {useSelector} from "react-redux";
import Loader from "../../UI/Loader/Loader";
import {Empty} from "antd";
import Message from "../../UI/Message/Message";

const Products = ({currentPage, setCurrentPage}) => {
    const {loading, products, totalPages} = useSelector(state => state.product)
    const observer = useRef(null);
    const hasMore = useMemo(() => {
        return totalPages >= currentPage
    }, [currentPage, totalPages])

    const lastProductRef = useCallback((node) => {
        if (loading) return
        if (observer.current) observer.current?.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setCurrentPage(prev => prev + 1)
            }
        })

        if (node) observer.current?.observe(node);
    }, [loading, hasMore, setCurrentPage])

    if (!products.length) {
        return (
            <div className={c.wrapper}>
                <Empty description={(
                    <Message>Список товаров пуст.</Message>
                )}/>
            </div>
        )
    }

    return (
        <div className={c.block}>
            <ul className={c.list}>
                {Array.isArray(products) && products?.map((product, idx) => (
                    <li ref={lastProductRef} className={c.item} key={product.id}>
                        {products.length - 1 === idx ? (
                            <ProductCard
                                ref={lastProductRef}
                                {...product}
                            />
                        ) : (
                            <ProductCard
                                {...product}
                            />
                        )}
                    </li>
                ))}
            </ul>
            <Loader loading={loading} color={'white'} />
        </div>
    );
}


export default Products;