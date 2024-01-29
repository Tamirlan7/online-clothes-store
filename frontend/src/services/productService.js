import {axiosClient} from "./axiosClient";

const productService = {}

productService.getProducts = ({
    q,
                              }) => {
    let url = '/product'
    if (!q && q !== '') {
        url = url + `/q=${q}`
    }
    return axiosClient.get(url)
}

productService.getProductsByCollection = (collection) => {
    return axiosClient.get(`/product/collection/${collection}`)
}

productService.getProductById = (productId) => {
    return axiosClient.get(`/product/${productId}`)
}

export default productService;