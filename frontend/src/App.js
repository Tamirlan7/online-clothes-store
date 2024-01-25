import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Privacy from "./pages/privacy/Privacy";
import AeDrop from "./pages/aeDrop/AeDrop";
import Card from "./pages/card/Card";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/ae" element={<AeDrop />}></Route>
        <Route path="/ae/item/:id" element={<Card />}></Route>
        <Route path="/catalog" element={<div>Каталог</div>}></Route>
        <Route path="/album" element={<div>Альбом</div>}></Route>
        <Route path="/contacts" element={<div>Контакты</div>}></Route>
        <Route path="/privacy" element={<Privacy />}></Route>
        <Route path="/care" element={<div>Уход за изделиями</div>}></Route>
      </Routes>
    </div>
  );
}

export default App;
