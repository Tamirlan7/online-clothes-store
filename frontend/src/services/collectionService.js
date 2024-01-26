import {axiosClient} from "./axiosClient";

const collectionService = {}

collectionService.getAllCollections = () => {
    return axiosClient.get('/collection');
}

export default collectionService