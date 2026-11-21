import React from 'react';
import './About.css';
import pic from '../../assets/about-pic.jpg';

function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-card-wrapper">
          <div className="about-image-column">
            <img src={pic} alt="Our botanical greenhouse" className="about-photo" />
            <div className="about-experience-badge">
              <span className="badge-years">10+</span>
              <span className="badge-text">Years of Sustainable Cultivation</span>
            </div>
          </div>

          <div className="about-content-column">
            <span className="section-badge">🌿 Our Greenhouse Story</span>
            <h2 className="about-title">
              Nurturing Healthier Plants for Greener, Calmer Homes
            </h2>

            <p className="about-lead">
              At Plants Avenue, we believe surrounding yourself with living foliage brings peace, cleaner air, and mindful grounding to busy modern routines.
            </p>

            <p className="about-description">
              Every single plant in our collection is grown in organic, peat-reduced potting mixes without harsh synthetic pesticides. Before leaving our greenhouse, each specimen passes our strict 5-point root, stem, and leaf vitality inspection.
            </p>

            <div className="about-perks-grid">
              <div className="perk-box">
                <span className="perk-icon">🌱</span>
                <strong>Zero Chemical Pesticides</strong>
                <small>Cultivated with natural bio-controls & beneficial microbes</small>
              </div>

              <div className="perk-box">
                <span className="perk-icon">📦</span>
                <strong>Biodegradable Packaging</strong>
                <small>100% plastic-free, recyclable corrugated protective wraps</small>
              </div>
            </div>

            <div className="about-cta-row">
              <a href="#shop" className="about-explore-btn">
                Shop Our Greenhouse ➜
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
