import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay-gradient"></div>
      <div className="container hero-wrapper">
        <div className="hero-content">
          <h1 className="hero-heading">
            Bring The Living Nature <br />
            <span className="hero-heading-highlight">Into Your Home</span>
          </h1>

          <p className="hero-subtext">
            Transform your living space with our nursery-fresh indoor houseplants,
            curated succulents, and air-purifying foliage. Shipped in 100% eco-friendly protective packaging.
          </p>

          <div className="hero-actions-group">
            <a href="#shop" className="hero-btn-primary">
              Explore Collection <span className="btn-arrow">➜</span>
            </a>
            <a href="#quiz" className="hero-btn-secondary">
              Plant Matcher Quiz <span className="btn-sparkle">✨</span>
            </a>
          </div>

          {/* Metrics row */}
          <div className="hero-metrics-bar">
            <div className="metric-item">
              <span className="metric-number">50+</span>
              <span className="metric-label">Indoor Varieties</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">15k+</span>
              <span className="metric-label">Happy Plant Parents</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">4.9 ★</span>
              <span className="metric-label">Top Customer Rating</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">30-Day</span>
              <span className="metric-label">Arrival Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
