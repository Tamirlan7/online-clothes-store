import Router from "./router/Router";
import {Suspense} from "react";
import PageLoader from "./UI/PageLoader/PageLoader";

function App() {

    return (
        <Suspense fallback={<PageLoader/>}>
            <Router/>
        </Suspense>
    );
}

export default App;
