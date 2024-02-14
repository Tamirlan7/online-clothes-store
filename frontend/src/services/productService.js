import {axiosClient} from "./axiosClient";
import {axiosAdmin} from "./axiosAdmin";

const productService = {}

productService.getProducts = ({
    name,
    collection,
    clothingType,
    page,
    size,
                              }) => {
    let url = '/product'
    let urlChanged = false

    if (name) {
        url = url + `?name=${name}&`
        urlChanged = true
    }

    if (collection) {
        url = url + `?collection=${collection}&`
        urlChanged = true
    }

    if (clothingType) {
        url = url + `?clothingType=${clothingType}&`
        urlChanged = true
    }

    if (page >= 0) {
        url = url + `?page=${page}&`
        urlChanged = true
    }

    if (size) {
        url = url + `?size=${size}&`
        urlChanged = true
    }

    if (urlChanged) {
        url = url.substring(0, url.length - 1);
    }

    try {
        return axiosClient.get(url)
    } catch (err) {
        console.log('sui here')
    }
}

productService.getProductsByCollection = (collection) => {
    return axiosClient.get(`/product/collection/${collection}`)
}

productService.getProductById = (productId) => {
    return axiosClient.get(`/product/${productId}`)
}

productService.createProduct = (data) => {
    return axiosAdmin.post(`/product`, data, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    });
}

productService.deleteProduct = (id) => {
    return axiosAdmin.delete(`/product/${id}`);
}

productService.updateProducts = (data) => {
    return axiosAdmin.put('/product', data)
}

export default productService;