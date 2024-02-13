import {createAsyncThunk} from "@reduxjs/toolkit";
import clothingTypeService from "../services/clothingTypeService";

export const getAllClothingTypesThunk = createAsyncThunk(
    'clothingType/getAllClothingTypesThunk',
    async () => {
        try {
            const res = await clothingTypeService.getAllClothingTypes();
            return res.data
        } catch (err) {
            console.error(err)
            return err.message
        }
    }
)

