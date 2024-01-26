import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Privacy from "./pages/privacy/Privacy";
import AeDrop from "./pages/aeDrop/AeDrop";
import Card from "./pages/card/Card";
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
