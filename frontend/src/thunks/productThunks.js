import {createAsyncThunk} from "@reduxjs/toolkit";
import productService from "../services/productService";

export const getProductsThunk = createAsyncThunk(
    'product/getProducts',
    async () => {
        try {
            const res = await productService.getProducts();
            return res.data
        } catch (err) {
            console.error(err)
            return err.message
        }
    }
)
