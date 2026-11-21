import React, { useState } from 'react';
import './FAQ.css';

const FAQ_DATA = [
  {
    q: 'How do you safely ship living plants without damaging leaves or roots?',
    a: 'Every plant is hand-selected and nestled in custom-engineered, 100% recyclable corrugated plant cradles. We wrap root balls in breathable damp coconut moss to retain hydration during travel, and stabilize soil with biodegradable clips so not a single grain spills.'
  },
  {
    q: 'What is your 30-Day Healthy Plant Guarantee?',
    a: 'We guarantee every plant arrives healthy and stays that way for at least 30 days. If your plant arrives damaged, dehydrated, or struggles despite following our care instructions, simply take a quick photo and our botanist support team will send a free replacement or full refund right away.'
  },
  {
    q: 'How do I know which plants are safe for cats and dogs?',
    a: 'You can filter our shop directly by the "Pet Friendly" category or look for the 🐾 Pet Safe badge on product cards. Plants like Calathea Orbifolia and Echeveria Rosettes are non-toxic to furry friends.'
  },
  {
    q: 'Do your plants arrive potted in soil, or are they bare root?',
    a: 'All our plants arrive fully potted in nutrient-rich organic nursery potting mix with proper drainage holes. They are ready to display immediately in your decorative cachepots or ceramic planters.'
  },
  {
    q: 'How do I apply promotional discount codes like GROW15?',
    a: 'Once you add any plants to your cart, open the cart drawer or checkout screen and enter your code into the "Coupon code" field. Click "Apply" and your discount will be deducted automatically from your order total!'
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-header">
          <span className="section-badge">❓ Frequently Asked Questions</span>
          <h2 className="section-title">Everything You Need to Know</h2>
          <p className="section-subtitle">
            Got questions about plant delivery, pot sizing, or care tips? We have answers.
          </p>
        </div>

        <div className="faq-accordion-box">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFAQ(idx)}
              >
                <div className="faq-question-row">
                  <h4>{item.q}</h4>
                  <span className="faq-chevron">{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && (
                  <div className="faq-answer-content">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
