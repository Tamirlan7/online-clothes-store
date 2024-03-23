import {createAsyncThunk} from "@reduxjs/toolkit";
import adminService from "../services/adminService";
import {raiseNotification} from "../slices/notificationSlice";

export const getAllAdminsThunk = createAsyncThunk(
    'adminSlice/getAllAdminsThunk',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const res = await adminService.getAllAdmins()
            return res.data
        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке получения всех админов',
                type: 'error'
            }))

            rejectWithValue(err)
        }
    }
)

export const registerAdminThunk = createAsyncThunk(
    'adminSlice/registerAdminThunk',
    async ({username, password}, {dispatch, rejectWithValue}) => {
        try {
            const res = await adminService.registerAdmin({ username, password })
            return res.data
        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке регистрации админа',
                type: 'error'
            }))

            rejectWithValue(err)
        }
    }
)