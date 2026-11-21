import React from 'react';
import './Wishlist.css';

function Wishlist({ isOpen, onClose, wishlist, onRemoveFromWishlist, onAddToCart, onOpenProductModal }) {
  if (!isOpen) return null;

  return (
    <div className="wishlist-overlay" onClick={onClose}>
      <div className="wishlist-drawer" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <div className="wishlist-header">
          <div className="wishlist-header-left">
            <h3>Saved Plants</h3>
            <span className="wishlist-count-badge">
              {wishlist.length} {wishlist.length === 1 ? 'plant' : 'plants'}
            </span>
          </div>
          <button className="wishlist-close" onClick={onClose} aria-label="Close wishlist">
            ✕
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <div className="empty-heart-icon">💚</div>
            <h4>Your wishlist is empty</h4>
            <p>Save your favorite leafy friends here by clicking the heart icon on any plant.</p>
            <button className="wishlist-browse-btn" onClick={onClose}>
              Explore Plants
            </button>
          </div>
        ) : (
          <div className="wishlist-items-list">
            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-item-card">
                <div
                  className="wishlist-item-img"
                  onClick={() => {
                    onOpenProductModal(item);
                    onClose();
                  }}
                >
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="wishlist-item-details">
                  <span className="wishlist-item-cat">{item.category}</span>
                  <h4
                    className="wishlist-item-title"
                    onClick={() => {
                      onOpenProductModal(item);
                      onClose();
                    }}
                  >
                    {item.name}
                  </h4>
                  <div className="wishlist-item-price">
                    <strong>${item.price.toFixed(2)}</strong>
                    {item.originalPrice && (
                      <span className="wishlist-item-orig-price">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="wishlist-item-tags">
                    <span>💧 {item.care?.water?.split(' ')[0] || 'Care'}</span>
                    <span>☀️ {item.care?.light?.split(' ')[0] || 'Light'}</span>
                  </div>
                </div>

                <div className="wishlist-item-actions">
                  <button
                    className="wishlist-add-cart-btn"
                    onClick={() => {
                      onAddToCart(item);
                      onRemoveFromWishlist(item.id);
                    }}
                    title="Move to Cart"
                  >
                    Move to Cart 🛒
                  </button>
                  <button
                    className="wishlist-remove-btn"
                    onClick={() => onRemoveFromWishlist(item.id)}
                    title="Remove from favorites"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
