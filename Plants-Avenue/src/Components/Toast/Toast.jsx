import React from 'react';
import './Toast.css';

function Toast({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card toast-${toast.type || 'info'}`}>
          <div className="toast-icon">
            {toast.type === 'success' && '🌿'}
            {toast.type === 'info' && '✨'}
            {toast.type === 'heart' && '💚'}
            {toast.type === 'warn' && '⚠️'}
            {!['success', 'info', 'heart', 'warn'].includes(toast.type) && '🌱'}
          </div>
          <div className="toast-content">
            <h5 className="toast-title">{toast.title}</h5>
            {toast.message && <p className="toast-message">{toast.message}</p>}
          </div>
          <button
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toast;
