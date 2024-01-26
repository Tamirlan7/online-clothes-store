import {axiosClient} from "./axiosClient";

const productService = {}

productService.getProducts = () => {
    return axiosClient.get('/product')
}

productService.getProductsByCollection = (collection) => {
    return axiosClient.get(`/product/collection/${collection}`)
}

productService.getProductById = (productId) => {
    return axiosClient.get(`/product/${productId}`)
}

export default productService;