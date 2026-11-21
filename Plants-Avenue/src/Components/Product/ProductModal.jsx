import React, { useState } from 'react';
import './ProductModal.css';

function ProductModal({ product, onClose, onAddToCart, isWishlisted, onToggleWishlist }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('care');

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart({ ...product, quantity });
    onClose();
  };

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="product-modal-grid">
          {/* Image side */}
          <div className="modal-image-col">
            <div className="modal-image-wrapper">
              <img src={product.image} alt={product.name} />
              {product.badge && (
                <span className={`modal-badge badge-${product.badgeType || 'hot'}`}>
                  {product.badge}
                </span>
              )}
            </div>

            <div className="modal-quick-stats">
              <div className="quick-stat">
                <span className="stat-icon">📏</span>
                <div>
                  <small>Height</small>
                  <strong>{product.height || '12-16 inches'}</strong>
                </div>
              </div>
              <div className="quick-stat">
                <span className="stat-icon">🪴</span>
                <div>
                  <small>Pot Size</small>
                  <strong>{product.potSize || '6 inch nursery pot'}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Details side */}
          <div className="modal-info-col">
            <div className="modal-header">
              <div className="modal-category">{product.category}</div>
              <h2 className="modal-title">{product.name}</h2>
              <p className="modal-scientific">
                <em>{product.scientificName}</em>
              </p>

              <div className="modal-rating">
                <div className="stars">★★★★★</div>
                <span className="rating-score">{product.rating}</span>
                <span className="rating-count">({product.reviewsCount} customer reviews)</span>
              </div>

              <div className="modal-pricing">
                <span className="modal-price">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="modal-original-price">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="modal-discount-pill">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <p className="modal-description">{product.description}</p>

            {/* Care specs grid */}
            <div className="care-specs-grid">
              <div className="care-spec-item">
                <span className="care-spec-icon">☀️</span>
                <div className="care-spec-text">
                  <span className="spec-label">Light Needs</span>
                  <span className="spec-value">{product.care?.light}</span>
                </div>
              </div>

              <div className="care-spec-item">
                <span className="care-spec-icon">💧</span>
                <div className="care-spec-text">
                  <span className="spec-label">Watering</span>
                  <span className="spec-value">{product.care?.water}</span>
                </div>
              </div>

              <div className="care-spec-item">
                <span className="care-spec-icon">🐾</span>
                <div className="care-spec-text">
                  <span className="spec-label">Pet Friendly</span>
                  <span className="spec-value">
                    {product.care?.petSafe ? '100% Non-Toxic' : 'Toxic if ingested'}
                  </span>
                </div>
              </div>

              <div className="care-spec-item">
                <span className="care-spec-icon">🌿</span>
                <div className="care-spec-text">
                  <span className="spec-label">Care Level</span>
                  <span className="spec-value">{product.care?.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Benefits & Guarantee Tabs */}
            <div className="modal-tabs">
              <button
                className={`tab-btn ${activeTab === 'care' ? 'active' : ''}`}
                onClick={() => setActiveTab('care')}
              >
                Key Highlights
              </button>
              <button
                className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                Packaging & Guarantee
              </button>
            </div>

            <div className="modal-tab-content">
              {activeTab === 'care' ? (
                <ul className="modal-benefits-list">
                  {(product.benefits || [
                    'Air-purifying botanical properties',
                    'Nursery grown in organic soil',
                    '30-day healthy arrival guarantee'
                  ]).map((benefit, i) => (
                    <li key={i}>
                      <span className="check-bullet">✓</span> {benefit}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="shipping-guarantee-text">
                  📦 <strong>Zero-Damage Guarantee:</strong> Shipped in custom corrugated plant cradles that keep the soil secure and leaves intact. If your plant arrives stressed or damaged, send a photo within 30 days for a free replacement!
                </p>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="modal-actions-box">
              <div className="modal-qty-selector">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>

              <button className="modal-add-btn" onClick={handleAdd}>
                Add to Cart • ${(product.price * quantity).toFixed(2)}
              </button>

              <button
                className={`modal-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product)}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                {isWishlisted ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
