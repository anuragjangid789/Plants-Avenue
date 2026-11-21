import React, { useState } from 'react';
import './Cart.css';

const VALID_COUPONS = {
  GROW15: { discountPercent: 0.15, label: '15% Off Spring Promo' },
  WELCOME10: { discountPercent: 0.10, label: '10% Off Welcome Bonus' },
  PLANTLOVE: { fixedAmount: 5.00, label: '$5.00 Flat Discount' }
};

const FREE_SHIPPING_THRESHOLD = 50.00;

function Cart({
  cart,
  setCart,
  isOpen,
  setIsOpen,
  onProceedToCheckout,
  appliedCoupon,
  setAppliedCoupon
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState({ text: '', isError: false });

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Calculate discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = rawSubtotal * appliedCoupon.discountPercent;
    } else if (appliedCoupon.fixedAmount) {
      discountAmount = Math.min(rawSubtotal, appliedCoupon.fixedAmount);
    }
  }

  const shippingCost = rawSubtotal >= FREE_SHIPPING_THRESHOLD || rawSubtotal === 0 ? 0 : 3.99;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (VALID_COUPONS[cleanCode]) {
      const couponObj = { code: cleanCode, ...VALID_COUPONS[cleanCode] };
      setAppliedCoupon(couponObj);
      setCouponMsg({ text: `✓ Applied: ${couponObj.label}`, isError: false });
      setCouponInput('');
    } else {
      setCouponMsg({ text: 'Invalid coupon code. Try GROW15 or WELCOME10', isError: true });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponMsg({ text: '', isError: false });
  };

  const freeShippingProgress = Math.min(100, (rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);

  return (
    <>
      {isOpen && <div className="cart-overlay-backdrop" onClick={() => setIsOpen(false)}></div>}

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`} data-lenis-prevent>
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <h3>Your Shopping Cart</h3>
            <span className="cart-item-count-badge">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>
          <button className="cart-close-icon" onClick={() => setIsOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="shipping-progress-box">
          <div className="shipping-progress-text">
            {remainingForFreeShip > 0 ? (
              <span>
                Add <strong>${remainingForFreeShip.toFixed(2)}</strong> more for <strong>FREE Delivery!</strong> 🚚
              </span>
            ) : (
              <span className="unlocked-text">
                🎉 Congratulations! You unlocked <strong>FREE Delivery</strong>!
              </span>
            )}
          </div>
          <div className="shipping-progress-bar-bg">
            <div
              className={`shipping-progress-bar-fill ${remainingForFreeShip === 0 ? 'complete' : ''}`}
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty-view">
            <div className="empty-cart-leaf">🪴</div>
            <h4>Your cart is empty</h4>
            <p>Give a plant a good home! Check out our collection of indoor botanicals and succulents.</p>
            <button className="cart-browse-btn" onClick={() => setIsOpen(false)}>
              Browse Plants Now
            </button>
          </div>
        ) : (
          <div className="cart-content-scroll">
            <div className="cart-items-wrapper">
              {cart.map((item) => (
                <div className="cart-card" key={item.id}>
                  <div className="cart-card-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-card-details">
                    <h4 className="cart-card-name">{item.name}</h4>
                    <p className="cart-card-unit-price">${item.price.toFixed(2)} each</p>

                    <div className="cart-card-controls">
                      <div className="qty-stepper">
                        <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">
                          +
                        </button>
                      </div>

                      <span className="cart-card-item-subtotal">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="cart-card-remove-btn"
                    onClick={() => removeItem(item.id)}
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-clear-row">
              <button className="cart-clear-btn" onClick={clearCart}>
                Clear All Items
              </button>
            </div>

            {/* Promo Code Input */}
            <div className="cart-promo-section">
              <form onSubmit={handleApplyCoupon} className="promo-form">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. GROW15)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button type="submit">Apply</button>
              </form>

              {appliedCoupon && (
                <div className="applied-coupon-tag">
                  <span>🏷️ <strong>{appliedCoupon.code}</strong>: {appliedCoupon.label}</span>
                  <button onClick={handleRemoveCoupon}>✕</button>
                </div>
              )}

              {couponMsg.text && !appliedCoupon && (
                <p className={`promo-feedback ${couponMsg.isError ? 'err' : 'ok'}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Order Cost Breakdown */}
            <div className="cart-summary-box">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <strong>${rawSubtotal.toFixed(2)}</strong>
              </div>

              {discountAmount > 0 && (
                <div className="cart-summary-row discount">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <strong>-${discountAmount.toFixed(2)}</strong>
                </div>
              )}

              <div className="cart-summary-row">
                <span>Estimated Shipping</span>
                <strong>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</strong>
              </div>

              <div className="cart-summary-row grand-total">
                <span>Estimated Total</span>
                <span className="total-digits">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="checkout-trigger-btn"
              onClick={() => {
                setIsOpen(false);
                onProceedToCheckout({
                  rawSubtotal,
                  discountAmount,
                  appliedCoupon: appliedCoupon?.code,
                  finalTotal
                });
              }}
            >
              Proceed to Checkout 🔒
            </button>

            <p className="cart-guarantee-note">
              🛡️ 30-Day Healthy Plant Guarantee & Free Returns
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
