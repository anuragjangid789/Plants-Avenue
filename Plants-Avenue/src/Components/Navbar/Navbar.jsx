import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import logo from "../../assets/plants-logo2.png";
import "./Navbar.css";
import Login from "../Login/Login";
function Navbar({ cartCount, setIsOpen }) {

    const [menuOpen, setMenuOpen] = useState(false)

    const [showLogin, setShowLogin] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo">PLANTS AVENUE
                <img src={logo} alt="logo" />
            </div>
            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                <li><a href="#home">Home</a></li>
                <li><a href="#shop">Shop</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>

            <div className="nav-right">

                <div className="icon-wrapper">
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" onClick={() => setIsOpen(true)} />

                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </div>

                <div className="icon-wrapper" onClick={() => setShowLogin(true)}>
                    <FontAwesomeIcon icon={faUser} size="lg" />
                </div>

                {showLogin && <Login onClose={() => setShowLogin(false)} />}

                <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>
            </div>
        </nav>
    );
}

export default Navbar;