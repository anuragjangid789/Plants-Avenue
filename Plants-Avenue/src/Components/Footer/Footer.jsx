import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faXTwitter, faCcVisa, faCcMastercard, faCcPaypal, faCcApplePay } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-wrapper">

                {/* About Section */}
                <div className="footer-para">
                    <h2>Plants Avenue</h2>
                    <p>We provide the best quality plants and help you create a green and healthy environment at your home.</p>
                </div>

                {/* Categories Section */}
                <div className="footer-col">
                    <h3>Our Categories</h3>
                    <ul>
                        <li>Indoor Plants</li>
                        <li>Outdoor Plants</li>
                        <li>Cacti & Succulents</li>
                        <li>Flowering Plants</li>
                        <li>Plant Care Kits</li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footer-col">
                    <h3>Contact</h3>
                    <p><FontAwesomeIcon icon={faEnvelope} /> anuragjangid789@gmail.com</p>
                    <p><FontAwesomeIcon icon={faPhone} /> +91 8769328060</p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Location: Jaipur</p>
                </div>

                {/* Socials & Payments Section */}
                <div className="footer-col">
                    <h3>Follow Us</h3>
                    <div className="socials">
                        <a href="https://www.instagram.com/anuragjangid_" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                        </a>
                        <a href="https://www.facebook.com/anuragjangid" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                        </a>
                        <a href="https://twitter.com/anuragjangid" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
                        </a>
                    </div>

                    <div className="payment-methods">
                        <FontAwesomeIcon icon={faCcVisa} />
                        <FontAwesomeIcon icon={faCcMastercard} />
                        <FontAwesomeIcon icon={faCcPaypal} />
                        <FontAwesomeIcon icon={faCcApplePay} />
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <hr />
                <p>© 2026 Plant Store. All rights reserved.</p>
                <p className="made-with-love">
                    Made with <FontAwesomeIcon icon={faHeart} className="heart-icon" /> by Anurag Jangid
                </p>
            </div>
        </footer>
    );
};

export default Footer;