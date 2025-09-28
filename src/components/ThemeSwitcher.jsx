import React from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = ({ theme, toggleTheme }) => (
  <div className="theme-switcher">
    <button
      onClick={toggleTheme}
      className="theme-button"
    >
      {theme === 'light' ? '☀️' : '🌙'}
    </button>
  </div>
);

export default ThemeSwitcher;