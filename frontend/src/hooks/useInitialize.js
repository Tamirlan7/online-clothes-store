import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {getAllCollectionsThunk} from "../thunks/collectionThunks";
import {getAllClothingTypesThunk} from "../thunks/clothingTypeThunks";
import {changeDeviceSize} from "../slices/appSlice";

export default function useInitialize() {
    const dispatch = useDispatch()

    const handleResize = useCallback((e) => {
        dispatch(changeDeviceSize({
            width: e.target.innerWidth,
            height: e.target.innerHeight,
        }))
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllCollectionsThunk())
        dispatch(getAllClothingTypesThunk())

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [dispatch, handleResize]);

}