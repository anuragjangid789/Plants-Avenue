import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebook,
  faXTwitter,
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
  faCcApplePay
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faHeart,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section" id="contact">
      {/* Newsletter Strip */}
      <div className="newsletter-strip">
        <div className="container newsletter-wrapper">
          <div className="newsletter-text">
            <span className="newsletter-tag">💌 Plant Club Newsletter</span>
            <h3>Get 15% Off Your First Botanical Order</h3>
            <p>Subscribe for seasonal plant care reminders, greenhouse drop alerts, and exclusive subscriber perks.</p>
          </div>

          <div className="newsletter-form-container">
            {subscribed ? (
              <div className="newsletter-success-box">
                <span>🌿</span>
                <p>Welcome to the family! Use discount code <strong>GROW15</strong> at checkout for 15% off.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container main-footer-body">
        <div className="footer-col brand-col">
          <div className="footer-logo">PLANTS AVENUE</div>
          <p className="footer-bio">
            Curating healthy, pesticide-free houseplants and succulents since 2016. Every plant is packed with love in recyclable cradles and backed by our 30-day vitality guarantee.
          </p>
          <div className="socials-list">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore Shop</h4>
          <ul className="footer-links">
            <li><a href="#shop">All Plants</a></li>
            <li><a href="#shop">Indoor Plants</a></li>
            <li><a href="#shop">Succulents</a></li>
            <li><a href="#shop">Air-Purifying</a></li>
            <li><a href="#shop">Pet-Friendly</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#quiz">Plant Quiz 🌱</a></li>
            <li><a href="#care">Care Guide</a></li>
            <li><a href="#about">About Our Greenhouse</a></li>
            <li><a href="#faq">Delivery FAQ</a></li>
          </ul>
        </div>

        <div className="footer-col contact-col">
          <h4>Plant Doctor & Contact</h4>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            <span>care@plantsavenue.com</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} className="contact-icon" />
            <span>+1 (800) 555-LEAF</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
            <span>Botanical District, Portland, OR</span>
          </p>

          <div className="payment-badges-row">
            <FontAwesomeIcon icon={faCcVisa} />
            <FontAwesomeIcon icon={faCcMastercard} />
            <FontAwesomeIcon icon={faCcPaypal} />
            <FontAwesomeIcon icon={faCcApplePay} />
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-bar-inner">
          <p>© {new Date().getFullYear()} Plants Avenue. All rights reserved. Pure Frontend E-Commerce.</p>
          <p className="made-with">
            Cultivated with <FontAwesomeIcon icon={faHeart} className="heart-icon" /> for plant parents everywhere.
          </p>
          <button className="back-to-top-btn" onClick={scrollToTop} title="Back to top" aria-label="Back to top">
            <FontAwesomeIcon icon={faArrowUp} /> Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
