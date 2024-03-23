import {createAsyncThunk} from "@reduxjs/toolkit";
import collectionService from "../services/collectionService";
import {raiseNotification} from "../slices/notificationSlice";

export const getAllCollectionsThunk = createAsyncThunk(
    'collection/getAllCollections',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await collectionService.getAllCollections();
            return res.data
        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке загрузки списка коллекции с сервера',
                type: 'error'
            }))

            return rejectWithValue(err.message)
        }
    }
)

export const addCollectionThunk = createAsyncThunk(
    'collection/addCollectionThunk',
    async (collection, {dispatch, rejectWithValue}) => {
        try {
            const res = await collectionService.addCollection(collection);
            return res.data
        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке добавить коллекцию',
                type: 'error'
            }))

            return rejectWithValue(err.message)
        }
    }
)

export const deleteCollectionThunk = createAsyncThunk(
    'collection/deleteCollectionThunk',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            await collectionService.deleteCollection(id);
            return id
        } catch (err) {
            dispatch(raiseNotification({
                message: err.message,
                description: 'Произошла ошибка при попытке удаления коллекций',
                type: 'error'
            }))

            return rejectWithValue(err.message)
        }
    }
)