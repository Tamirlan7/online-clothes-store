import {axiosClient} from "./axiosClient";

const productService = {}

productService.getProducts = () => {
    return axiosClient.get('/product')
}

productService.getProductsByCollection = (collection) => {
    return axiosClient.get(`/product/collection/${collection}`)
}

export default productService;