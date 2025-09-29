import { useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import WeatherDisplay from '../components/WeatherDisplay.jsx';
import { useFetch } from '../hooks/useFetch.js';
import './Home.css';

const Home = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearch = (city) => {
    setSelectedCity(city);
  };

  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = selectedCity
    ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(selectedCity)}&appid=${API_KEY}&units=metric&lang=es`
    : null;

  const { data, isLoading, error } = useFetch(url);

  return (
    <div className="page home-page">
      <header className="page-header">
        <h1 className="page-title">Panel de Control del Clima</h1>
        <p className="page-subtitle">Busca el clima actual de cualquier ciudad y consulta detalles adicionales.</p>
      </header>
      <section className="page-panel home-search" aria-label="Buscador de ciudades">
        <SearchBar onSearch={handleSearch} />
      </section>
      <WeatherDisplay data={data} loading={isLoading} error={error} showDetailsLink />
    </div>
  );
};

export default Home;
