import React from 'react';
import { Link } from 'react-router-dom';
import '../style/cartWidget.css';
import { IoCart } from "react-icons/io5";
import { useCart } from '../context/CartContext';

function CartWidget() {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <Link to="/cart" className='cart-widget-link'>
      <div className="cart-widget">
        <IoCart className="cart-icon" />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </div>
    </Link>
  );
}

export default CartWidget;
