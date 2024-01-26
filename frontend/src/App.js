import Navbar from "./components/Navbar/Navbar";
import Router from "./router/Router";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getProductsThunk} from "./thunks/productThunks";
import {getAllCollectionsThunk} from "./thunks/collectionThunks";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCollectionsThunk())
        dispatch(getProductsThunk())
    }, [dispatch])

    return (
        <>
            <header>
                <Navbar/>
            </header>

            <main>
                <Router/>
            </main>
        </>
    );
}

export default App;
