import React from 'react';
import './Banner.css';
import pic1 from '../../assets/banner-pic1.jpg';
import pic2 from '../../assets/banner-pic2.jpg';

function Banner() {
  return (
    <section className="banner-section">
      <div className="container">
        <div className="banner-card">
          <div className="banner-left-text">
            <span className="banner-tag">🌱 Green Life Philosophy</span>
            <h2>Grow Plants For A Calmer, Healthier Life</h2>
            <p>
              Plants purify the air you breathe, reduce stress, and bring the organic beauty of nature right into your workspace and home.
            </p>
            <a href="#shop" className="banner-shop-btn">
              Explore Our Plants ➜
            </a>
          </div>

          <div className="banner-visual-cluster">
            <div className="banner-circle-img circle-1">
              <img src={pic1} alt="Lush foliage arrangement" />
            </div>
            <div className="banner-circle-img circle-2">
              <img src={pic2} alt="Sunlit indoor plants" />
            </div>
            <div className="banner-leaf-badge">
              <span>🌿 100% Organic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
