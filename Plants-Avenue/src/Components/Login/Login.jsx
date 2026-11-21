import React, { useState } from 'react';
import './Login.css';
import loginimg from '../../assets/login-img.jpg';

function Login({ onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister && !formData.name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const userData = {
      name: isRegister ? formData.name.trim() : (formData.name.trim() || formData.email.split('@')[0]),
      email: formData.email.trim()
    };

    onLoginSuccess(userData);
    onClose();
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Elena Rostova',
      email: 'elena.plants@example.com'
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="login-left">
          <img src={loginimg} alt="Botanical aesthetic" />
          <div className="login-left-overlay">
            <blockquote>"To plant a garden is to believe in tomorrow."</blockquote>
            <span>— Audrey Hepburn</span>
          </div>
        </div>

        <div className="login-right">
          <div className="auth-tab-switch">
            <button
              className={`auth-tab ${!isRegister ? 'active' : ''}`}
              onClick={() => {
                setIsRegister(false);
                setError('');
              }}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${isRegister ? 'active' : ''}`}
              onClick={() => {
                setIsRegister(true);
                setError('');
              }}
            >
              Register
            </button>
          </div>

          <h2>{isRegister ? 'Join the Plant Family' : 'Welcome Back'}</h2>
          <p className="auth-subtitle">
            {isRegister
              ? 'Create an account to track plant orders & get member perks.'
              : 'Log in to access your saved plants & order history.'}
          </p>

          {error && <div className="auth-error-msg">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && (
              <div className="auth-field">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Elena Rostova"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="auth-field">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              {isRegister ? 'Create Account 🌿' : 'Sign In ➜'}
            </button>

            <button type="button" className="demo-login-btn" onClick={handleDemoLogin}>
              ⚡ 1-Click Demo Sign In
            </button>

            <p className="switch-text">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <span onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Sign In here' : 'Register now'}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
