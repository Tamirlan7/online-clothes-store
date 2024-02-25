import React from 'react';
import c from './Products.module.scss'
import ProductCard from "../ProductCard/ProductCard";
import {useSelector} from "react-redux";
import Loader from "../../UI/Loader/Loader";
import {Empty} from "antd";
import Message from "../../UI/Message/Message";

const Products = () => {
    const { loading, products } = useSelector(state => state.product)

    if (loading) {
        return (
            <div className={c.wrapper}>
                <Loader color={'white'} />
                <div>Идет загрузка</div>
            </div>
        )
    }

    if (!products.length) {
        return (
            <div className={c.wrapper}>
                <Empty description={(
                    <Message>Список товаров пуст.</Message>
                )} />
            </div>
        )
    }

    return (
        <ul className={c.list}>
            {Array.isArray(products) ? products?.map((product) => (
                <li className={c.item} key={product.id}>
                    <ProductCard
                        {...product}
                    />
                </li>
            )) : (
                <Loader />
            )}
        </ul>
    );
}


export default Products;