import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import ProductCard from '../components/productCard';
import { useFavorites } from '../context/FavoritesContext';
import '../style/favorites.css';
import '../style/layout.css';

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <>
    <div className='container1'></div>
    <div className='container'>
      <Header/>
      <div className="favorites">
        <br></br>
        <h1 className="favorites-title">❤️ My Favorites</h1>
        <p className="favorites-subtitle">Your favorite presentation templates</p>
        <br></br>
        
        {favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-favorites">
            <p>No favorites yet. Click the heart icon on products to add them here!</p>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Favorites;
