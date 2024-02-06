import {createAsyncThunk} from "@reduxjs/toolkit";
import productService from "../services/productService";

export const getProductsThunk = createAsyncThunk(
    'product/getProductsThunk',
    async (
        {
            q,
            collection,
            clothingType
        },
        {
            rejectWithValue
        }
    ) => {
        try {
            const res = await productService.getProducts({
                q,
                collection,
                clothingType
            });

            return {
                collection,
                products: res.data
            }
        } catch (err) {
            console.error(err)
            rejectWithValue(err.message)
        }
    }
)

export const getProductByIdThunk = createAsyncThunk(
    "product/getProductByIdThunk",
    async (
        productId,
        {
            rejectWithValue,
        }
    ) => {
        try {
            // productId: number

            const res = await productService.getProductById(productId);
            return res.data
        } catch (err) {
            console.error(err)
            rejectWithValue(err.message)
        }
    }
)

export const createProductThunk = createAsyncThunk(
    "product/createProductThunk",
    async (
        data,
        {
            rejectWithValue,
        }
    ) => {
        try {
            const res = await productService.createProduct(data);
            return res.data
        } catch (err) {
            console.error(err)
            rejectWithValue(err.message)
        }
    }
)