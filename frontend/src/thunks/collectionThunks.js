import {createAsyncThunk} from "@reduxjs/toolkit";
import collectionService from "../services/collectionService";

export const getAllCollectionsThunk = createAsyncThunk(
    'collection/getAllCollections',
    async () => {
        try {
            const res = await collectionService.getAllCollections();
            return res.data
        } catch (err) {
            console.error(err)
            return err.message
        }
    }
)

