import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getAllCollectionsThunk} from "../thunks/collectionThunks";
import {getAllClothingTypesThunk} from "../thunks/clothingTypeThunks";

export default function useInitialize() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCollectionsThunk())
        dispatch(getAllClothingTypesThunk())
    }, [dispatch]);

}