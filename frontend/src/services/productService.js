import {axiosClient} from "./axiosClient";

const productService = {}

productService.getProducts = ({
    q,
    collection,
    clothingType,
                              }) => {
    let url = '/product'
    let urlChanged = false

    if (q && q !== '') {
        url = url + `?q=${q}&`
        urlChanged = true
    }

    if (collection && collection !== '') {
        url = url + `?collection=${collection}&`
        urlChanged = true
    }

    if (clothingType && clothingType !== '') {
        url = url + `?clothingType=${clothingType}&`
        urlChanged = true
    }

    if (urlChanged) {
        url = url.substring(0, url.length - 1);
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