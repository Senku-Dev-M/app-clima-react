import { useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import WeatherDisplay from '../components/WeatherDisplay.jsx';
import { useFetch } from '../hooks/useFetch.js';

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
      <h1 className="app-title">Panel de Control del Clima</h1>
      <p className="page-subtitle">Busca el clima actual de cualquier ciudad y consulta detalles adicionales.</p>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay data={data} loading={isLoading} error={error} showDetailsLink />
    </div>
  );
};

export default Home;
