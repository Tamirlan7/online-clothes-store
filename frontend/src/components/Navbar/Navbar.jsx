import React, {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import {SidebarData} from "../../data/SidebarData";
import "./Navbar.scss";
import BurgerMenu from "../../assets/images/burger-menu.svg";
import CloseBtn from "../../assets/images/clode-btn.svg";
import LOGO from "../../assets/images/logo.svg";
import Cart from "../../assets/images/cart.svg";
import {showCart} from "../../slices/cartSlice";
import {useDispatch} from "react-redux";

function Navbar() {
    const dispatch = useDispatch()
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const sidebarRef = useRef(null);

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSidebar(false);
        }
    };

    const handleClickOnCart = () => {
        dispatch(showCart())
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="navbar">
                <img
                    className="menu-bars"
                    src={CloseBtn}
                    alt="close-btn"
                    onClick={showSidebar}
                />
                <Link to="/">
                    <img className="navbar-logo" src={LOGO} alt="logo"/>
                </Link>
                <div className="navbar-right">
                    <button onClick={handleClickOnCart} className="navbar-cart">
                        <img src={Cart} alt="shoping cart"/>
                    </button>
                </div>
            </div>
            <nav
                className={sidebar ? "nav-menu active" : "nav-menu"}
                ref={sidebarRef}
            >
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <img className="close-btn" src={BurgerMenu} alt="burgermenu"/>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <span className={'span'}>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <p className="navbar-about">
                    UNC — the clothing brand has been in existence since 2021. Basing and
                    logistics management in Russia, Cheboksary.
                </p>
            </nav>
        </header>
    );
}

export default Navbar;
