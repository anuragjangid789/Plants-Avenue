import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/plants-logo2.png';
import './Navbar.css';

function Navbar({
  cartCount,
  setIsOpen,
  wishlistCount,
  setIsWishlistOpen,
  user,
  onOpenAuth,
  onOpenProfile,
  onSearchFocus
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      {!announcementDismissed && (
        <div className="top-announcement-bar">
          <div className="announcement-content">
            <span className="announcement-icon">🌿</span>
            <span>
              Spring Botanical Sale: Use code <strong>GROW15</strong> for 15% off | Free eco-shipping over $50!
            </span>
          </div>
          <button
            className="announcement-close-btn"
            onClick={() => setAnnouncementDismissed(true)}
            aria-label="Dismiss announcement"
          >
            ×
          </button>
        </div>
      )}

      <header className={`navbar-header ${scrolled ? 'scrolled' : ''} ${announcementDismissed ? 'no-announcement' : ''}`}>
        <nav className="navbar container">
          <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
            <span className="logo-text">PLANTS AVENUE</span>
            <img src={logo} alt="Plants Avenue Logo" />
          </a>

          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li>
              <a href="#home" onClick={() => setMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#shop" onClick={() => setMenuOpen(false)}>
                Shop
              </a>
            </li>
            <li>
              <a href="#quiz" onClick={() => setMenuOpen(false)}>
                Plant Quiz 🌱
              </a>
            </li>
            <li>
              <a href="#care" onClick={() => setMenuOpen(false)}>
                Care Guide
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#faq" onClick={() => setMenuOpen(false)}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </li>
          </ul>

          <div className="nav-right">
            {/* Search shortcut */}
            <button
              className="nav-icon-btn search-trigger"
              onClick={onSearchFocus}
              title="Search catalog"
              aria-label="Search catalog"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>

            {/* Wishlist */}
            <button
              className="nav-icon-btn wishlist-trigger"
              onClick={() => setIsWishlistOpen(true)}
              title="View Wishlist"
              aria-label="View Wishlist"
            >
              <FontAwesomeIcon icon={faHeart} />
              {wishlistCount > 0 && <span className="nav-badge heart-badge">{wishlistCount}</span>}
            </button>

            {/* Cart */}
            <button
              className="nav-icon-btn cart-trigger"
              onClick={() => setIsOpen(true)}
              title="View Cart"
              aria-label="View Cart"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartCount > 0 && <span className="nav-badge cart-badge">{cartCount}</span>}
            </button>

            {/* User Profile / Auth */}
            {user ? (
              <div
                className="user-profile-pill"
                onClick={onOpenProfile}
                title="Your Profile & Orders"
              >
                <div className="user-avatar-mini">
                  {user.name ? user.name.charAt(0).toUpperCase() : '🌿'}
                </div>
                <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
              </div>
            ) : (
              <button
                className="nav-icon-btn auth-trigger"
                onClick={onOpenAuth}
                title="Sign In or Register"
                aria-label="Sign In or Register"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Backdrop */}
      {menuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMenuOpen(false)}></div>
      )}
    </>
  );
}

export default Navbar;
