import React, { useState, useEffect } from 'react';
import '../style/search.css';
import { FaSearch } from "react-icons/fa";

function Search({ onSearch, placeholder = "Search for products..." }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Sample product data - replace with actual product data
  const sampleProducts = [
    'Presentation Templates',
    'Business Slides',
    'Marketing Templates',
    'Education Templates',
    'Creative Designs',
    'Corporate Templates',
    'Resume Templates',
    'Portfolio Templates',
    'Dashboard Templates',
    'Report Templates'
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredSuggestions = sampleProducts.filter(product =>
        product.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setIsOpen(false);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setIsOpen(false);
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="search-input"
            autoComplete="off"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="search-clear"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <button type="submit" className="search-button" aria-label="Search">
            <FaSearch />
          </button>
        </div>
        
        {isOpen && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default Search;
