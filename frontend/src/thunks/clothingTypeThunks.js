import {createAsyncThunk} from "@reduxjs/toolkit";
import clothingTypeService from "../services/clothingTypeService";
import {raiseNotification} from "../slices/notificationSlice";

export const getAllClothingTypesThunk = createAsyncThunk(
    'clothingType/getAllClothingTypesThunk',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const res = await clothingTypeService.getAllClothingTypes();
            return res.data
        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке загрузки списка артикул с сервера',
                type: 'error'
            }))

            return rejectWithValue(err.message)
        }
    }
)

export const addClothingTypeThunk = createAsyncThunk(
    'clothingType/addClothingTypeThunk',
    async (clothingType, {dispatch, rejectWithValue}) => {
        try {
            const res = await clothingTypeService.addClothingType(clothingType);
            return res.data
        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке добавить тип одежды',
                type: 'error'
            }))

            return rejectWithValue(err.message)
        }
    }
)