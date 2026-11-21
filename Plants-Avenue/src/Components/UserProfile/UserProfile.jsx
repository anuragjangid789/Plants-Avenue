import React from 'react';
import './UserProfile.css';

function UserProfile({ isOpen, onClose, user, onLogout, orderHistory }) {
  if (!isOpen || !user) return null;

  return (
    <div className="user-profile-overlay" onClick={onClose}>
      <div className="user-profile-card" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <button className="profile-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="profile-hero-section">
          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : '🌿'}
          </div>
          <div className="profile-user-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <span className="profile-tier-badge">🌿 Green Thumb VIP Member</span>
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-orders-section">
            <h4>Recent Orders & Plant Deliveries</h4>

            {orderHistory && orderHistory.length > 0 ? (
              <div className="profile-orders-list">
                {orderHistory.map((order) => (
                  <div key={order.id} className="profile-order-card">
                    <div className="order-card-header">
                      <div>
                        <strong>Order #{order.id}</strong>
                        <small className="order-date">{order.date}</small>
                      </div>
                      <span className="order-status-badge">{order.status || 'In Transit 🚚'}</span>
                    </div>

                    <div className="order-card-items">
                      {order.items?.map((item) => (
                        <div key={item.id} className="order-mini-item">
                          <img src={item.image} alt={item.name} />
                          <span>{item.name} (x{item.quantity})</span>
                        </div>
                      ))}
                    </div>

                    <div className="order-card-footer">
                      <span>Paid: <strong>${order.total?.toFixed(2)}</strong></span>
                      <small>{order.paymentMethod}</small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="profile-no-orders">
                <span className="no-order-icon">📦</span>
                <p>No orders placed yet. Your leafy companions are waiting in the shop!</p>
              </div>
            )}
          </div>

          <div className="profile-actions-row">
            <button className="profile-logout-btn" onClick={onLogout}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
