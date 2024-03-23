import {axiosClient} from "./axiosClient";
import {axiosAdmin} from "./axiosAdmin";

const clothingTypeService = {}

clothingTypeService.getAllClothingTypes = () => {
    return axiosClient.get('/product/clothing-type');
}

clothingTypeService.addClothingType = (clothingType) => {
    return axiosAdmin.post('/product/clothing-type', {clothingType})
}

clothingTypeService.deleteClothingType = (id) => {
    return axiosAdmin.delete(`/product/clothing-type/${id}`)
}

export default clothingTypeService