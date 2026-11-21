import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Features from './Components/Features/Features';
import Product from './Components/Product/Product';
import ProductModal from './Components/Product/ProductModal';
import PlantQuiz from './Components/PlantQuiz/PlantQuiz';
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist';
import Checkout from './Components/Checkout/Checkout';
import Login from './Components/Login/Login';
import UserProfile from './Components/UserProfile/UserProfile';
import Banner from './Components/Banner/Banner';
import Steps from './Components/Steps/Steps';
import About from './Components/About/About';
import Testimonials from './Components/Testimonials/Testimonials';
import FAQ from './Components/FAQ/FAQ';
import Footer from './Components/Footer/Footer';
import Toast from './Components/Toast/Toast';
import './App.css';

function App() {
  // 1. LocalStorage-persisted Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('plants_avenue_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('plants_avenue_cart', JSON.stringify(cart));
    } catch (err) {
      console.warn('Storage error', err);
    }
  }, [cart]);

  // 2. LocalStorage-persisted Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('plants_avenue_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('plants_avenue_wishlist', JSON.stringify(wishlist));
    } catch (err) {
      console.warn('Storage error', err);
    }
  }, [wishlist]);

  // 3. LocalStorage-persisted User
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('plants_avenue_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('plants_avenue_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('plants_avenue_user');
      }
    } catch (err) {
      console.warn('Storage error', err);
    }
  }, [user]);

  // 4. LocalStorage-persisted Order History
  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('plants_avenue_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('plants_avenue_orders', JSON.stringify(orderHistory));
    } catch (err) {
      console.warn('Storage error', err);
    }
  }, [orderHistory]);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  // Cart & Promo
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    window.lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  // Toast notifications
  const [toasts, setToasts] = useState([]);
  const addToast = (title, message = '', type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Search input ref
  const searchInputRef = useRef(null);
  const handleSearchFocus = () => {
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      if (window.lenis) {
        window.lenis.scrollTo(shopEl, { offset: -70 });
      } else {
        shopEl.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 500);
    }
  };

  // Add to Cart
  const addToCart = (product) => {
    const qtyToAdd = product.quantity || 1;
    setCart((prevCart) => {
      const isExist = prevCart.find((item) => item.id === product.id);
      if (isExist) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: qtyToAdd }];
    });
    addToast('Added to Cart! 🌿', `${product.name} (x${qtyToAdd})`, 'success');
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast('Removed from Wishlist', `${product.name}`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast('Saved to Wishlist! 💚', `${product.name}`, 'heart');
    }
  };

  // Order Placement
  const handleOrderPlaced = (orderRecord) => {
    setOrderHistory((prev) => [orderRecord, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    addToast('🎉 Order Confirmed!', `Ref #${orderRecord.id} is being hand-packed.`, 'success');
  };

  // Auth actions
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    addToast(`Welcome back, ${userData.name}! 🌿`, 'Logged into your plant account.', 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
    addToast('Signed Out', 'You have been signed out.', 'info');
  };

  // Cart totals for checkout
  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = rawSubtotal * appliedCoupon.discountPercent;
    } else if (appliedCoupon.fixedAmount) {
      discountAmount = Math.min(rawSubtotal, appliedCoupon.fixedAmount);
    }
  }

  const totalCartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="app-container">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        setIsOpen={setIsCartOpen}
        wishlistCount={wishlist.length}
        setIsWishlistOpen={setIsWishlistOpen}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSearchFocus={handleSearchFocus}
      />

      {/* Main Sections */}
      <main>
        <div id="home">
          <Hero />
        </div>

        <Features />

        <div id="shop">
          <Product
            ref={searchInputRef}
            addToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onOpenProductModal={(item) => setSelectedProductModal(item)}
          />
        </div>

        <PlantQuiz
          onAddToCart={addToCart}
          onOpenProductModal={(item) => setSelectedProductModal(item)}
        />

        <Banner />

        <div id="care">
          <Steps />
        </div>

        <div id="about">
          <About />
        </div>

        <Testimonials />

        <div id="faq">
          <FAQ />
        </div>
      </main>

      {/* Footer */}
      <div id="contact">
        <Footer />
      </div>

      {/* Cart Drawer */}
      <Cart
        cart={cart}
        setCart={setCart}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Wishlist Drawer */}
      <Wishlist
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => {
          setWishlist((prev) => prev.filter((item) => item.id !== id));
        }}
        onAddToCart={addToCart}
        onOpenProductModal={(item) => setSelectedProductModal(item)}
      />

      {/* Product Quick View Modal */}
      {selectedProductModal && (
        <ProductModal
          product={selectedProductModal}
          onClose={() => setSelectedProductModal(null)}
          onAddToCart={addToCart}
          isWishlisted={wishlist.some((w) => w.id === selectedProductModal.id)}
          onToggleWishlist={toggleWishlist}
        />
      )}

      {/* Checkout Modal */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        discount={discountAmount}
        promoCode={appliedCoupon?.code || ''}
        total={rawSubtotal}
        onOrderPlaced={handleOrderPlaced}
        user={user}
      />

      {/* Login / Register Modal */}
      {isAuthOpen && (
        <Login
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* User Profile & Past Orders Modal */}
      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={handleLogout}
        orderHistory={orderHistory}
      />
    </div>
  );
}

export default App;
