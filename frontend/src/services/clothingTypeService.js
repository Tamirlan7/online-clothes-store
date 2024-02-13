import {axiosClient} from "./axiosClient";

const clothingTypeService = {}

clothingTypeService.getAllClothingTypes = () => {
    return axiosClient.get('/product/clothing-type');
}

export default clothingTypeService