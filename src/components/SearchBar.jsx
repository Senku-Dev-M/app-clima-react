import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [inputCity, setInputCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCity = inputCity.trim();
    if (trimmedCity !== '') {
      onSearch?.(trimmedCity);
    }
    setInputCity('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        placeholder="Ej: Ciudad de México, Madrid, Buenos Aires"
        className="search-input"
        aria-label="Buscar ciudad"
      />
      <button
        type="submit"
        className="search-button"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
