import Router from "./router/Router";
import {Suspense, useState} from "react";
import PageLoader from "./UI/PageLoader/PageLoader";
import RadioButton from "./UI/RadioButton/RadioButton";

function App() {
    const [option, setOption] = useState(0)

    return (
        <Suspense fallback={<PageLoader/>}>
            <Router/>
        </Suspense>
    );
}

export default App;
