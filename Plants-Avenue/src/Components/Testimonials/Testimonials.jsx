import React from 'react';
import './Testimonials.css';

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Sophia Martinez',
    location: 'Austin, TX',
    rating: 5,
    plant: 'Monstera Deliciosa',
    quote: 'Arrived in absolute pristine condition! The corrugated packaging kept all soil intact and the fenestrated leaves were glossy and healthy. 10/10 recommend!',
    avatar: 'SM'
  },
  {
    id: 2,
    name: 'David Chen',
    location: 'Seattle, WA',
    rating: 5,
    plant: 'Calathea Orbifolia',
    quote: 'As a cat owner, finding genuine pet-safe plants is hard. Plants Avenue made it effortless. My Calathea is doing great and safe around my curious kitten.',
    avatar: 'DC'
  },
  {
    id: 3,
    name: 'Emily Watson',
    location: 'Chicago, IL',
    rating: 5,
    plant: 'Golden Pothos Deluxe',
    quote: 'The digital care instructions that came with my order saved my life. Two months later and this pothos has grown over 10 inches down my bookshelf!',
    avatar: 'EW'
  }
];

function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <span className="section-badge">💬 Real Plant Lovers</span>
          <h2 className="section-title">Loved by Thousands of Plant Parents</h2>
          <p className="section-subtitle">
            See what customers have to say about our nursery-fresh deliveries and packaging.
          </p>
        </div>

        <div className="testimonials-grid">
          {REVIEWS_DATA.map((rev) => (
            <div className="testimonial-card" key={rev.id}>
              <div className="test-card-top">
                <div className="test-stars">{'★'.repeat(rev.rating)}</div>
                <span className="verified-badge">✓ Verified Buyer</span>
              </div>

              <p className="test-quote">"{rev.quote}"</p>

              <div className="test-plant-purchased">
                <span>Purchased:</span> <strong>{rev.plant}</strong>
              </div>

              <div className="test-author-row">
                <div className="test-avatar">{rev.avatar}</div>
                <div className="test-author-info">
                  <strong>{rev.name}</strong>
                  <small>{rev.location}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
