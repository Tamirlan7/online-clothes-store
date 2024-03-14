import {createAsyncThunk} from "@reduxjs/toolkit";
import userService from "../services/userService";
import logout from "../utils/logout";

export const loginViaTelegram = createAsyncThunk(
    "product/loginViaTelegram",
    async (
        {
            data
        },
        {
            rejectWithValue,
        }
    ) => {
        try {
            const res = await userService.loginViaTelegram(data);
            return res.data
        } catch (err) {
            console.error(err)
            rejectWithValue(err.message)
        }
    }
)

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

export const refreshTokenThunk = createAsyncThunk(
    "product/refreshTokenThunk",
    async (
        {
            refreshToken
        },
        {
            rejectWithValue,
        }
    ) => {
        try {
            const res = await userService.refreshToken(refreshToken);

            if (res.status >= 400) {
                logout()
                rejectWithValue(res.data)
            }

            return res.data
        } catch (err) {
            console.error(err)
            logout()
            rejectWithValue(err.message)
        }
    }
)