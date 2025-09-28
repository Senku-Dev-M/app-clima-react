import React from 'react';
import { Link } from 'react-router-dom';
import './WeatherDisplay.css';

const WeatherDisplay = ({ data, loading, error, showDetailsLink = false }) => {
  if (loading) {
    return (
      <section className="page-panel weather-feedback">
        <p className="message">Cargando datos del clima...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-panel weather-feedback">
        <p className="message error">{error}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="page-panel weather-feedback">
        <p className="message">Usa la barra de búsqueda para ver el clima de una ciudad.</p>
      </section>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const forecastLink = `/forecast/${encodeURIComponent(data.name)}`;
  const formattedDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="weather-display-card">
      <div className="weather-summary">
        <div className="weather-summary__header">
          <h2 className="city-name">{data.name}</h2>
          <p className="date">{formattedDate}</p>
        </div>
        <div className="weather-summary__main">
          <img src={iconUrl} alt={data.weather[0].description} className="weather-icon" />
          <div className="weather-summary__temperature">
            <p className="temperature">{Math.round(data.main.temp)}°C</p>
            <p className="description">{data.weather[0].description}</p>
          </div>
        </div>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <p className="detail-label">Sensación térmica</p>
          <p className="detail-value">{Math.round(data.main.feels_like)}°C</p>
        </div>
        <div className="detail-item">
          <p className="detail-label">Humedad</p>
          <p className="detail-value">{data.main.humidity}%</p>
        </div>
        <div className="detail-item">
          <p className="detail-label">Viento</p>
          <p className="detail-value">{Math.round(data.wind.speed * 3.6)} km/h</p>
        </div>
        <div className="detail-item">
          <p className="detail-label">Presión</p>
          <p className="detail-value">{data.main.pressure} hPa</p>
        </div>
      </div>
      {showDetailsLink && (
        <div className="details-link-wrapper">
          <Link className="details-link" to={forecastLink}>
            Ver pronóstico detallado
          </Link>
        </div>
      )}
    </article>
  );
};

export default WeatherDisplay;
