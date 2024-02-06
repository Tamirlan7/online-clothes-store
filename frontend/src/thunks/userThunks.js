import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../services/userService";

export const loginThunk = createAsyncThunk(
    "product/loginThunk",
    async (
        {
            data
        },
        {
            rejectWithValue,
        }
    ) => {
        try {
            const res = await userService.login(data);
            return res.data
        } catch (err) {
            console.error(err)
            rejectWithValue(err.message)
        }
    }
)