import React from 'react';
import './ThemeSwitcher.css';
import { useTheme } from '../context/ThemeContext.jsx';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <button
        onClick={toggleTheme}
        className="theme-button"
        type="button"
        aria-label="Cambiar tema"
        title={theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}
      >
        {theme === 'light' ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
