import React from 'react';
import './Features.css';

const FEATURES_DATA = [
  {
    icon: '🚚',
    title: 'Nationwide Delivery',
    desc: 'Free eco-shipping on orders over $50'
  },
  {
    icon: '🛡️',
    title: '30-Day Guarantee',
    desc: 'Arrives healthy or 100% free replacement'
  },
  {
    icon: '🌱',
    title: 'Lifetime Plant Care',
    desc: 'Free digital guides & expert advice'
  },
  {
    icon: '♻️',
    title: '100% Eco Packaging',
    desc: 'Biodegradable pots & recycled cartons'
  }
];

function Features() {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {FEATURES_DATA.map((item, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">{item.icon}</span>
              </div>
              <div className="feature-text">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
