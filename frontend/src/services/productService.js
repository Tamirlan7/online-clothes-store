import {axiosClient} from "./axiosClient";

const productService = {}

productService.getProducts = () => {
    return axiosClient.get('/product')
}

export default productService;