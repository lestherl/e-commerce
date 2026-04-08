import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import '../style/cart.css';
import '../style/layout.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <>
    <div className='container1'></div>
    <div className='container'>
      <Header/>
      <div className="cart">
        <br></br>
        <h1 className="cart-title">🛒 Shopping Cart</h1>
        <p className="cart-subtitle">Review your selected items</p>
        <br></br>
        
        {cartItems.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                    <p className="item-description">{item.description}</p>
                  </div>
                  
                  <div className="item-price">
                    <span className="price">₱{item.price}</span>
                  </div>
                  
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <div className="item-total">
                    <span className="total-price">₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  
                  <div className="item-actions">
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-content">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₱{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%):</span>
                  <span>₱{(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₱{(getTotalPrice() * 1.1).toFixed(2)}</span>
                </div>
                
                <div className="cart-actions">
                  <button className="checkout-btn">Proceed to Checkout</button>
                  <button className="clear-btn" onClick={handleClearCart}>Clear Cart</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-content">
              <h2>Your cart is empty</h2>
              <p>Add some products to get started!</p>
              <a href="/product" className="continue-shopping-btn">Continue Shopping</a>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Cart;
