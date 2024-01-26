import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Privacy from "./pages/Privacy/Privacy";
import AeDrop from "./pages/AeDrop/AeDrop";
import Card from "./pages/ProductDetails/ProductDetails";
import Router from "./router/Router";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Router />
      </main>
    </div>
  );
}

export default App;
