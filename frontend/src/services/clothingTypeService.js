import {axiosClient} from "./axiosClient";
import {axiosAdmin} from "./axiosAdmin";

const clothingTypeService = {}

clothingTypeService.getAllClothingTypes = () => {
    return axiosClient.get('/product/clothing-type');
}

clothingTypeService.addClothingType = (clothingType) => {
    return axiosAdmin.post('/product/clothing-type', {clothingType})
}

export default clothingTypeService