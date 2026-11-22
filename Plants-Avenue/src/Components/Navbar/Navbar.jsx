import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faShoppingCart,
  faHeart,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
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
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (anchorId) => {
    setMenuOpen(false);
    const el = document.getElementById(anchorId);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -70 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        {/* Top Announcement Bar */}
        {!announcementDismissed && (
          <div className="top-announcement-bar">
            <div className="announcement-content">
              <span className="announcement-icon">🌿</span>
              <span className="announcement-text-desktop">
                Spring Botanical Sale: Use code <strong>GROW15</strong> for 15% off | Free shipping over $50!
              </span>
              <span className="announcement-text-mobile">
                15% OFF code <strong>GROW15</strong> • Free Ship $50+
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

        <nav className="navbar container">
          {/* Brand Logo */}
          <a
            href="#home"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            <span className="logo-text">PLANTS AVENUE</span>
            <img src={logo} alt="Plants Avenue" />
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links desktop-only">
            <li>
              <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
                Home
              </a>
            </li>
            <li>
              <a href="#shop" onClick={(e) => { e.preventDefault(); handleNavClick('shop'); }}>
                Shop
              </a>
            </li>
            <li>
              <a href="#quiz" onClick={(e) => { e.preventDefault(); handleNavClick('quiz'); }}>
                Plant Quiz 🌱
              </a>
            </li>
            <li>
              <a href="#care" onClick={(e) => { e.preventDefault(); handleNavClick('care'); }}>
                Care Guide
              </a>
            </li>
            <li>
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>
                About
              </a>
            </li>
            <li>
              <a href="#faq" onClick={(e) => { e.preventDefault(); handleNavClick('faq'); }}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>
                Contact
              </a>
            </li>
          </ul>

          {/* Nav Right Actions */}
          <div className="nav-right">
            {/* Search Trigger */}
            <button
              className="nav-icon-btn search-trigger"
              onClick={onSearchFocus}
              title="Search catalog"
              aria-label="Search catalog"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>

            {/* Wishlist Button - Desktop only in header to prevent mobile clutter */}
            <button
              className="nav-icon-btn wishlist-trigger desktop-only-btn"
              onClick={() => setIsWishlistOpen(true)}
              title="View Wishlist"
              aria-label="View Wishlist"
            >
              <FontAwesomeIcon icon={faHeart} />
              {wishlistCount > 0 && <span className="nav-badge heart-badge">{wishlistCount}</span>}
            </button>

            {/* Cart Button */}
            <button
              className="nav-icon-btn cart-trigger"
              onClick={() => setIsOpen(true)}
              title="View Cart"
              aria-label="View Cart"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartCount > 0 && <span className="nav-badge cart-badge">{cartCount}</span>}
            </button>

            {/* User Profile / Auth - Desktop only in header */}
            {user ? (
              <div
                className="user-profile-pill desktop-only-btn"
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
                className="nav-icon-btn auth-trigger desktop-only-btn"
                onClick={onOpenAuth}
                title="Sign In or Register"
                aria-label="Sign In or Register"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              className="menu-btn mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </header>

      {/* Enhanced Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} data-lenis-prevent>
        <div className="mobile-drawer-header">
          <div className="drawer-logo">
            <span className="logo-text">PLANTS AVENUE</span>
            <img src={logo} alt="Plants Avenue Logo" />
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* User Card / Login in Mobile Drawer */}
        <div className="mobile-user-card">
          {user ? (
            <div
              className="mobile-user-logged"
              onClick={() => {
                setMenuOpen(false);
                onOpenProfile();
              }}
            >
              <div className="mobile-user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : '🌿'}
              </div>
              <div className="mobile-user-meta">
                <strong>{user.name}</strong>
                <small>Green Thumb VIP • View Orders ➜</small>
              </div>
            </div>
          ) : (
            <button
              className="mobile-login-cta"
              onClick={() => {
                setMenuOpen(false);
                onOpenAuth();
              }}
            >
              <FontAwesomeIcon icon={faUser} />
              <span>Sign In / Create Account ➜</span>
            </button>
          )}
        </div>

        {/* Quick Actions (Wishlist & Cart in Drawer) */}
        <div className="mobile-quick-actions">
          <button
            className="drawer-action-pill"
            onClick={() => {
              setMenuOpen(false);
              setIsWishlistOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faHeart} className="action-heart-icon" />
            <span>Saved Wishlist</span>
            {wishlistCount > 0 && <span className="drawer-pill-badge">{wishlistCount}</span>}
          </button>

          <button
            className="drawer-action-pill"
            onClick={() => {
              setMenuOpen(false);
              setIsOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="action-cart-icon" />
            <span>My Cart</span>
            {cartCount > 0 && <span className="drawer-pill-badge cart">{cartCount}</span>}
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <ul className="mobile-nav-list">
          <li>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              <span className="nav-item-icon">🏡</span> Home
            </a>
          </li>
          <li>
            <a
              href="#shop"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('shop');
              }}
            >
              <span className="nav-item-icon">🌿</span> Shop All Plants
            </a>
          </li>
          <li>
            <a
              href="#quiz"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('quiz');
              }}
            >
              <span className="nav-item-icon">✨</span> Plant Matcher Quiz
            </a>
          </li>
          <li>
            <a
              href="#care"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('care');
              }}
            >
              <span className="nav-item-icon">💧</span> Plant Care Guide
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
            >
              <span className="nav-item-icon">🪴</span> About Our Greenhouse
            </a>
          </li>
          <li>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('faq');
              }}
            >
              <span className="nav-item-icon">❓</span> Delivery FAQ
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
            >
              <span className="nav-item-icon">📞</span> Contact Us
            </a>
          </li>
        </ul>

        {/* Bottom Drawer Promo Banner */}
        <div className="mobile-drawer-promo">
          <span>🏷️ Coupon Code:</span>
          <strong>GROW15</strong>
          <small>Use at checkout for 15% off</small>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {menuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMenuOpen(false)}></div>
      )}
    </>
  );
}

export default Navbar;
