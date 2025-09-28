import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ setCity }) => {
  const [inputCity, setInputCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim() !== '') {
      setCity(inputCity);
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