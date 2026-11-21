import React, { useState } from 'react';
import './Checkout.css';

function Checkout({ isOpen, onClose, cart, discount, promoCode, total, onOrderPlaced, user }) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderSummary, setOrderSummary] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Alex Green',
    email: user?.email || 'alex.green@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    zipCode: '97477',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888'
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const shippingCost = total >= 50 ? 0 : (shippingMethod === 'express' ? 5.99 : 3.99);
  const finalTotal = Math.max(0, total - discount + shippingCost);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateShipping = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.address.trim()) errs.address = 'Delivery address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.zipCode.trim()) errs.zipCode = 'Postal code is required';
    return errs;
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    const errs = validateShipping();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderId = 'PA-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const orderRecord = {
      id: orderId,
      date: dateStr,
      items: cart,
      subtotal: total,
      discount,
      promoCode,
      shippingCost,
      total: finalTotal,
      shippingAddress: `${formData.address}, ${formData.city} ${formData.zipCode}`,
      paymentMethod: paymentMethod === 'card' ? 'Credit Card (ending 4242)' : paymentMethod === 'apple' ? 'Apple Pay' : 'Cash on Delivery',
      status: 'In Transit 🚚'
    };

    setOrderSummary(orderRecord);
    onOrderPlaced(orderRecord);
    setStep(3);
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <button className="checkout-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {step < 3 ? (
          <div className="checkout-grid">
            {/* Left side: Form steps */}
            <div className="checkout-main-content">
              {/* Stepper indicator */}
              <div className="checkout-stepper">
                <div className={`step-badge ${step >= 1 ? 'active' : ''}`}>
                  <span className="step-num">1</span>
                  <span>Shipping Address</span>
                </div>
                <div className="step-connector"></div>
                <div className={`step-badge ${step >= 2 ? 'active' : ''}`}>
                  <span className="step-num">2</span>
                  <span>Payment & Review</span>
                </div>
              </div>

              {step === 1 ? (
                <form onSubmit={handleNextToPayment} className="checkout-form">
                  <h3>Where should we deliver your plants?</h3>
                  <p className="form-subtext">We hand-pack each plant with organic coconut coir and damp moss.</p>

                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Jane Doe"
                    />
                    {errors.fullName && <span className="field-err">{errors.fullName}</span>}
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Email Address (For Tracking)</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jane@example.com"
                      />
                      {errors.email && <span className="field-err">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, unit, street"
                    />
                    {errors.address && <span className="field-err">{errors.address}</span>}
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Portland"
                      />
                      {errors.city && <span className="field-err">{errors.city}</span>}
                    </div>

                    <div className="form-group">
                      <label>ZIP / Postal Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="e.g. 97201"
                      />
                      {errors.zipCode && <span className="field-err">{errors.zipCode}</span>}
                    </div>
                  </div>

                  {/* Delivery Speed */}
                  <div className="shipping-options-section">
                    <label className="section-label">Select Delivery Speed</label>
                    <div className="shipping-radio-grid">
                      <label className={`shipping-radio-card ${shippingMethod === 'standard' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                        />
                        <div className="radio-content">
                          <strong>Standard Eco-Courier (3-5 Business Days)</strong>
                          <small>Temperature controlled van</small>
                        </div>
                        <span className="radio-price">{total >= 50 ? 'FREE' : '$3.99'}</span>
                      </label>

                      <label className={`shipping-radio-card ${shippingMethod === 'express' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                        />
                        <div className="radio-content">
                          <strong>Express Priority Plant Air (1-2 Days)</strong>
                          <small>Fastest root-protection transit</small>
                        </div>
                        <span className="radio-price">$5.99</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-actions-row">
                    <button type="submit" className="checkout-btn-primary">
                      Continue to Payment ➜
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePlaceOrder} className="checkout-form">
                  <h3>Payment Method</h3>
                  <p className="form-subtext">All transactions are encrypted with bank-grade 256-bit SSL.</p>

                  <div className="payment-tabs">
                    <button
                      type="button"
                      className={`payment-tab-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      💳 Credit / Debit Card
                    </button>
                    <button
                      type="button"
                      className={`payment-tab-btn ${paymentMethod === 'apple' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('apple')}
                    >
                       Apple Pay / GPay
                    </button>
                    <button
                      type="button"
                      className={`payment-tab-btn ${paymentMethod === 'cod' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      💵 Cash on Delivery
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="card-fields-box">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="4242 •••• •••• 4242"
                        />
                      </div>
                      <div className="form-row-2">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="form-group">
                          <label>CVC / CVV</label>
                          <input
                            type="text"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleInputChange}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'apple' && (
                    <div className="mock-apple-pay-box">
                      <div className="apple-pay-logo"> Pay</div>
                      <p>Instant 1-Click checkout with biometric TouchID or FaceID.</p>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="mock-cod-box">
                      <p>🌿 Pay directly to the eco-courier once your healthy plants arrive at your door.</p>
                    </div>
                  )}

                  <div className="checkout-security-notice">
                    <span>🛡️ 30-Day Healthy Plant Guarantee included with every order.</span>
                  </div>

                  <div className="form-actions-row">
                    <button
                      type="button"
                      className="checkout-btn-back"
                      onClick={() => setStep(1)}
                    >
                      ← Back to Shipping
                    </button>
                    <button type="submit" className="checkout-btn-primary">
                      Place Order • ${finalTotal.toFixed(2)}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right side: Mini Order Summary */}
            <div className="checkout-sidebar-summary">
              <h4>Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)})</h4>

              <div className="summary-items-scroll">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item-row">
                    <img src={item.image} alt={item.name} />
                    <div className="summary-item-info">
                      <strong>{item.name}</strong>
                      <small>Qty: {item.quantity}</small>
                    </div>
                    <span className="summary-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-cost-breakdown">
                <div className="cost-row">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="cost-row discount-row">
                    <span>Discount ({promoCode})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="cost-row">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>

                <div className="cost-row total-row">
                  <strong>Total</strong>
                  <strong>${finalTotal.toFixed(2)}</strong>
                </div>
              </div>

              <div className="eco-shipping-pledge">
                <span className="pledge-leaf">🌱</span>
                <p>1 tree planted for every order through our Eden Reforestation partnership.</p>
              </div>
            </div>
          </div>
        ) : (
          /* Step 3: Success Confirmation */
          <div className="order-success-screen">
            <div className="confetti-container">
              <span className="confetti c1">🌿</span>
              <span className="confetti c2">✨</span>
              <span className="confetti c3">🌸</span>
              <span className="confetti c4">🍃</span>
              <span className="confetti c5">🎉</span>
            </div>

            <div className="success-icon-badge">✓</div>
            <h2 className="success-title">Order Placed Successfully!</h2>
            <p className="success-subtitle">
              Thank you for choosing Plants Avenue! Your plant babies are being carefully inspected and prepared for eco-transit.
            </p>

            <div className="order-confirmation-card">
              <div className="confirm-row">
                <span>Order Reference:</span>
                <strong>{orderSummary?.id}</strong>
              </div>
              <div className="confirm-row">
                <span>Order Date:</span>
                <strong>{orderSummary?.date}</strong>
              </div>
              <div className="confirm-row">
                <span>Deliver To:</span>
                <strong>{orderSummary?.shippingAddress}</strong>
              </div>
              <div className="confirm-row">
                <span>Total Paid:</span>
                <strong className="paid-amount">${orderSummary?.total.toFixed(2)}</strong>
              </div>
              <div className="confirm-row">
                <span>Tracking Status:</span>
                <span className="status-pill">{orderSummary?.status}</span>
              </div>
            </div>

            <div className="success-actions">
              <button className="success-continue-btn" onClick={onClose}>
                Continue Shopping 🌿
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
