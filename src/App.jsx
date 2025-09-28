import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ThemeSwitcher from './components/ThemeSwitcher';
import './index.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [theme, setTheme] = useState('light');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!city) {
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
        );
        if (!response.ok) {
          throw new Error('No se encontraron datos del clima para esta ciudad. Por favor, revisa el nombre.');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, API_KEY]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${theme}-theme`}>
      <div className="app-content">
        <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
        <h1 className="app-title">Panel de Control del Clima</h1>
        <SearchBar setCity={setCity} />
        <WeatherDisplay data={weatherData} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;