import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import WeatherDisplay from '../components/WeatherDisplay.jsx';
import { useFetch } from '../hooks/useFetch.js';

const formatTime = (timestamp) =>
  new Date(timestamp * 1000).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

const formatVisibility = (visibility) => {
  if (visibility == null) {
    return 'Sin datos';
  }
  return `${(visibility / 1000).toFixed(1)} km`;
};

const ForecastDetails = () => {
  const { city } = useParams();
  const navigate = useNavigate();

  const decodedCity = useMemo(() => decodeURIComponent(city ?? ''), [city]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = decodedCity
    ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(decodedCity)}&appid=${API_KEY}&units=metric&lang=es`
    : null;

  const { data, isLoading, error } = useFetch(url);

  const handleSearch = (newCity) => {
    if (newCity) {
      navigate(`/forecast/${encodeURIComponent(newCity)}`);
    }
  };

  const extendedDetails = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        label: 'Temperatura mínima',
        value: `${Math.round(data.main.temp_min)}°C`,
      },
      {
        label: 'Temperatura máxima',
        value: `${Math.round(data.main.temp_max)}°C`,
      },
      {
        label: 'Amanecer',
        value: formatTime(data.sys.sunrise),
      },
      {
        label: 'Atardecer',
        value: formatTime(data.sys.sunset),
      },
      {
        label: 'Visibilidad',
        value: formatVisibility(data.visibility),
      },
      {
        label: 'Nubosidad',
        value: `${data.clouds.all}%`,
      },
    ];
  }, [data]);

  return (
    <div className="page forecast-page">
      <h1 className="page-title">Pronóstico detallado</h1>
      <p className="page-subtitle">Explora información adicional sobre las condiciones actuales en {decodedCity}.</p>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay data={data} loading={isLoading} error={error} />
      {data && (
        <section className="extended-details" aria-label="Información adicional del clima">
          <h2 className="section-title">Información adicional</h2>
          <div className="extended-grid">
            {extendedDetails.map(detail => (
              <div className="extended-item" key={detail.label}>
                <span className="extended-label">{detail.label}</span>
                <span className="extended-value">{detail.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ForecastDetails;
