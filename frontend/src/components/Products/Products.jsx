import React from 'react';
import c from './Products.module.scss'
import ProductCard from "../ProductCard/ProductCard";

const Products = ({ products }) => {
    return (
        <ul className={c.list}>
            {products?.map((product) => (
                <li className={c.item} key={product.id}>
                    <ProductCard
                        {...product}
                    />
                </li>
            ))}
        </ul>
    );
}

export default Products;