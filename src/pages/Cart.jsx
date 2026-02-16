import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container empty-cart">
          <h1 className="cart-title">Your Cart is Empty</h1>
          <p>Looking for exclusive events? Start exploring now.</p>
          <Link to="/events" className="checkout-btn" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
            EXPLORE EVENTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Header Section */}
        <div className="cart-header animate-slide-up">
          <div className="header-left">
            <h1 className="cart-title">Shopping Cart</h1>
            <span className="items-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag</span>
          </div>
          <Link to="/events" className="continue-shopping">
            &larr; CONTINUE SHOPPING
          </Link>
        </div>

        <div className="cart-content-grid">
          {/* Items List */}
          <div className="cart-items-column animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="cart-actions-row">
              <button className="clear-cart-btn" onClick={clearCart}>🗑 Clear Cart</button>
            </div>

            {cartItems.map((item, index) => (
              <div key={item.id} className="cart-item-card animate-slide-up" style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}>
                <div className="item-image-container">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-date">{item.date}</p>
                  <span className="item-category">GENERAL ADMISSION</span>
                </div>

                <div className="item-controls">
                  <div className="quantity-box">
                    <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">+</button>
                  </div>

                  <div className="item-pricing">
                    <span className="item-price">${item.price * item.quantity}</span>
                    <span className="price-each">${item.price} each</span>
                  </div>

                  <button className="remove-item-btn" onClick={() => removeFromCart(item.id)} title="Remove item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary sidebar */}
          <div className="cart-summary-column animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="summary-card">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="summary-row">
                  <span>Service Fee</span>
                  <span className="free-tag">Free</span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total-row">
                <span>Total</span>
                <span className="total-amount">
                  <span className="currency-symbol">$</span>
                  {cartTotal}
                </span>
              </div>

              <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                PROCEED TO CHECKOUT
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              <div className="trust-badges">
                <div className="trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <span>SECURE CHECKOUT</span>
                </div>
                <div className="trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  <span>INSTANT CONFIRMATION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}