import React from 'react';
import './Steps.css';

const CARE_STEPS = [
  {
    icon: '☀️',
    stepNumber: '01',
    title: 'Sunlight Calibration',
    desc: 'Most indoor plants crave bright indirect light. Avoid harsh noon sunbeams that can scorch delicate leaf tips.'
  },
  {
    icon: '💧',
    stepNumber: '02',
    title: 'The Finger Moisture Test',
    desc: 'Before watering, probe 2 inches into soil. If dry to the touch, water deeply until moisture drains from bottom drainage holes.'
  },
  {
    icon: '🪴',
    stepNumber: '03',
    title: 'Aerated Soil & Drainage',
    desc: 'Roots need oxygen as much as water. Ensure your ceramic or terracotta pots always have unblocked drainage holes.'
  },
  {
    icon: '✂️',
    stepNumber: '04',
    title: 'Grooming & Leaf Polish',
    desc: 'Dust leaves gently with a damp microfiber cloth once a month so foliage can photosynthesize cleanly and deter pests.'
  }
];

function Steps() {
  return (
    <section className="steps-section" id="care">
      <div className="container">
        <div className="steps-header">
          <span className="section-badge">🌱 Green Thumb Academy</span>
          <h2 className="section-title">4 Golden Rules for Thriving Plants</h2>
          <p className="section-subtitle">
            Caring for houseplants shouldn’t feel like guesswork. Follow these simple nursery principles to keep your plants lush for years.
          </p>
        </div>

        <div className="steps-grid">
          {CARE_STEPS.map((step) => (
            <div className="step-card" key={step.stepNumber}>
              <div className="step-number-tag">{step.stepNumber}</div>
              <div className="step-icon-circle">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Seasonal Pro Tip */}
        <div className="seasonal-tip-banner">
          <div className="tip-badge">🌿 Seasonal Care Tip</div>
          <p>
            <strong>Active Growing Season:</strong> Fertilize once every 3–4 weeks with organic seaweed extract during spring and summer. Ease off feeding completely in winter dormant months!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Steps;
