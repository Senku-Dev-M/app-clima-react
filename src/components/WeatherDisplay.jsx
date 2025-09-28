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

  const metrics = [
    {
      id: 'humidity',
      label: 'Humedad',
      value: `${data.main.humidity}%`,
      helper: 'Nivel de humedad',
    },
    {
      id: 'wind',
      label: 'Viento',
      value: `${Math.round(data.wind.speed * 3.6)} km/h`,
      helper: 'Velocidad del viento',
    },
    {
      id: 'pressure',
      label: 'Presión',
      value: `${data.main.pressure} hPa`,
      helper: 'Presión atmosférica',
    },
    {
      id: 'range',
      label: 'Mín / Máx',
      value: `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`,
      helper: 'Variación diaria',
    },
  ];

  if (typeof data.visibility === 'number') {
    const visibilityInKm = Math.round((data.visibility / 1000) * 10) / 10;
    metrics.splice(2, 0, {
      id: 'visibility',
      label: 'Visibilidad',
      value: `${visibilityInKm.toFixed(visibilityInKm % 1 === 0 ? 0 : 1)} km`,
      helper: 'Al nivel del suelo',
    });
  }

  return (
    <section className="weather-dashboard" aria-label="Resumen del clima actual">
      <article className="page-panel weather-overview">
        <header className="weather-overview__header">
          <h2 className="city-name">{data.name}</h2>
          <p className="date">{formattedDate}</p>
        </header>
        <div className="weather-overview__body">
          <img src={iconUrl} alt={data.weather[0].description} className="weather-icon" />
          <div className="temperature-stack">
            <p className="temperature">{Math.round(data.main.temp)}°C</p>
            <div className="temperature-meta">
              <span className="temperature-meta__label">Sensación</span>
              <span className="temperature-meta__value">{Math.round(data.main.feels_like)}°C</span>
            </div>
            <p className="description">{data.weather[0].description}</p>
          </div>
        </div>
      </article>
      <aside className="weather-side" aria-label="Indicadores complementarios">
        <div className="weather-metrics">
          {metrics.map((metric) => (
            <div key={metric.id} className="page-panel metric-card">
              <p className="metric-label">{metric.label}</p>
              <p className="metric-value">{metric.value}</p>
              {metric.helper && <p className="metric-helper">{metric.helper}</p>}
            </div>
          ))}
        </div>
        {showDetailsLink && (
          <div className="details-link-wrapper">
            <Link className="details-link" to={forecastLink}>
              Ver pronóstico detallado
            </Link>
          </div>
        )}
      </aside>
    </section>
  );
};

export default WeatherDisplay;
