import {createAsyncThunk} from "@reduxjs/toolkit";
import productService from "../services/productService";
import {raiseNotification} from "../slices/notificationSlice";

export const getProductsThunk = createAsyncThunk(
    'product/getProductsThunk',
    async (
        {
            name,
            collection,
            clothingType,
            page,
            size,
            resetProducts,
            includeOldProducts,
        },
        {
            rejectWithValue,
            dispatch
        }
    ) => {
        try {
            const res = await productService.getProducts({
                name,
                collection,
                clothingType,
                page,
                size
            });

            if (res.status >= 400) {
                rejectWithValue(res.data)
            }

            return {
                data: res.data,
                includeOldProducts,
                resetProducts
            }
        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке получения списка продуктов',
                type: 'error'
            }))

            return rejectWithValue(err.message)
        }
    }
)

export const getProductByIdThunk = createAsyncThunk(
    "product/getProductByIdThunk",
    async (
        productId,
        {
            rejectWithValue,
            dispatch
        }
    ) => {
        try {
            // productId: number

            const res = await productService.getProductById(productId);
            return res.data
        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке получения данных о продукте',
                type: 'error'
            }))

            return rejectWithValue(err.message)
        }
    }
)

export const updateProductsThunk = createAsyncThunk(
    "product/updateProductsThunk",
    async (
        {
            data,
        },
        {
            rejectWithValue,
            dispatch,
        }
    ) => {
        try {
            // data: Product[]
            const res = await productService.updateProducts(data);
            console.log(data)

            if (res.status < 400) {
                dispatch(raiseNotification({
                    message: 'Сообщение',
                    description: 'Изменения успешно применены',
                    type: 'success'
                }))

                return res.data
            }


        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке изменения продуктов',
                type: 'error'
            }))

            return rejectWithValue(err.message)
        }
    }
)

export const createProductThunk = createAsyncThunk(
    "product/createProductThunk",
    async (
        {
            formData,
        },
        {
            rejectWithValue,
            dispatch,
        }
    ) => {
        try {
            const res = await productService.createProduct(formData);

            if (res.status < 400) {
                dispatch(raiseNotification({
                    message: 'Сообщение',
                    description: 'Продукт успешно добавлен',
                    type: 'success'
                }))

                return res.data
            }


        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке добавления продукта',
                type: 'error'
            }))

            return rejectWithValue(err.message)
        }
    }
)

export const copyProductThunk = createAsyncThunk(
    "product/copyProductThunk",
    async (
        {
            id
        },
        {
            rejectWithValue,
            dispatch,
        }
    ) => {
        try {
            const res = await productService.copyProduct(id);

            if (res.status < 400) {
                dispatch(raiseNotification({
                    message: 'Сообщение',
                    description: `Продукт успешно дублирован`,
                    type: 'success'
                }))

                return res.data
            }
        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке дублирования продукта',
                type: 'error'
            }))

            return rejectWithValue(err.message)
        }
    }
)


export const deleteProductThunk = createAsyncThunk(
    "product/deleteProductThunk",
    async (
        {
            id
        },
        {
            rejectWithValue,
            dispatch,
        }
    ) => {
        try {
            const res = await productService.deleteProduct(id);

            if (res.status < 400) {
                dispatch(raiseNotification({
                    message: 'Сообщение',
                    description: `Продукт успешно удален`,
                    type: 'success'
                }))

                return id
            }
        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке удаления продукта',
                type: 'error'
            }))

            return rejectWithValue(err.message)
        }
    }
)
