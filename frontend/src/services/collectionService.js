import {axiosClient} from "./axiosClient";
import {axiosAdmin} from "./axiosAdmin";

const collectionService = {
}

collectionService.getAllCollections = () => {
    return axiosClient.get('/collection');
}

collectionService.addCollection = (collection) => {
    return axiosAdmin.post('/collection', {collectionName: collection})
}

collectionService.deleteCollection = (id) => {
    return axiosAdmin.delete(`/collection/${id}`)
}

export default collectionService