import {createAsyncThunk} from "@reduxjs/toolkit";
import productService from "../services/productService";

export const getProductsThunk = createAsyncThunk(
    'product/getProducts',
    async (
        {
            q,
        }
    ) => {
        try {
            const res = await productService.getProducts({
                q,
            });
            return res.data
        } catch (err) {
            console.error(err)
            return err.message
        }
    }
)

export const getProductsByCollectionThunk = createAsyncThunk(
    'product/getProductsByCollectionThunk',
    async ({ collection }) => {
        try {
            // collection: string (collectionName)

            const res = await productService.getProductsByCollection(collection);
            return {
                data: res.data,
                collection: collection
            }
        } catch (err) {
            console.error(err)
            return err.message
        }
    }
)

export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (productId) => {
        try {
            // productId: number

            const res = await productService.getProductById(productId);
            return res.data
        } catch (err) {
            console.error(err)
            return err.message
        }
    }
)
