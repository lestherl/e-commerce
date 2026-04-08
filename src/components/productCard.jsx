import React, { useState } from 'react';
import '../style/productCard.css';
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToFavorites, isFavorite: checkFavorite } = useFavorites();
  const { addToCart } = useCart();
  const isFavorite = checkFavorite(product.id);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleFavorite = () => {
    addToFavorites(product);
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <button 
          className="favorite-btn"
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaHeart className="heart filled" /> : <FaRegHeart className="heart" />}
        </button>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-text">{product.rating}</span>
          <span className="reviews-count">({product.reviews} reviews)</span>
        </div>

        <div className="product-price">
          <span className="current-price">₱{product.price}</span>
          <span className="original-price">₱{product.originalPrice}</span>
          <span className="discount-badge">-{discountPercentage}%</span>
        </div>

        <button 
          className={`add-to-cart-btn ${isHovered ? 'show' : ''}`}
          onClick={handleAddToCart}
        >
          <FaShoppingCart className="cart-icon" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
