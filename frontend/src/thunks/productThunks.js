import {createAsyncThunk} from "@reduxjs/toolkit";
import productService from "../services/productService";

export const getProductsThunk = createAsyncThunk(
    'product/getProducts',
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

export const getProductById = createAsyncThunk(
    "product/getProductById",
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
