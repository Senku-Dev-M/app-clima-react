
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WeatherDisplay from '../../components/WeatherDisplay';

describe('WeatherDisplay', () => {
  const mockWeatherData = {
    name: 'London',
    main: {
      temp: 15,
      feels_like: 14,
      humidity: 80,
      pressure: 1012,
    },
    weather: [
      {
        description: 'scattered clouds',
        icon: '03d',
      },
    ],
    wind: {
      speed: 5, // m/s
    },
  };

  it('should render loading message', () => {
    render(<WeatherDisplay loading={true} />);
    expect(screen.getByText('Cargando datos del clima...')).toBeInTheDocument();
  });

  it('should render error message', () => {
    render(<WeatherDisplay error="City not found" />);
    expect(screen.getByText('City not found')).toBeInTheDocument();
  });

  it('should render initial message when no data', () => {
    render(<WeatherDisplay />);
    expect(screen.getByText('Usa la barra de búsqueda para ver el clima de una ciudad.')).toBeInTheDocument();
  });

  it('should render weather data correctly', () => {
    render(
      <MemoryRouter>
        <WeatherDisplay data={mockWeatherData} />
      </MemoryRouter>
    );

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('15°C')).toBeInTheDocument();
    expect(screen.getByText('scattered clouds')).toBeInTheDocument();
    expect(screen.getByText('14°C')).toBeInTheDocument(); // Feels like
    expect(screen.getByText('80%')).toBeInTheDocument(); // Humidity
    expect(screen.getByText('18 km/h')).toBeInTheDocument(); // Wind speed
    expect(screen.getByText('1012 hPa')).toBeInTheDocument(); // Pressure
  });

  it('should render details link when showDetailsLink is true', () => {
    render(
      <MemoryRouter>
        <WeatherDisplay data={mockWeatherData} showDetailsLink={true} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /ver pronóstico detallado/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/forecast/London');
  });

  it('should not render details link by default', () => {
    render(
      <MemoryRouter>
        <WeatherDisplay data={mockWeatherData} />
      </MemoryRouter>
    );

    const link = screen.queryByRole('link', { name: /ver pronóstico detallado/i });
    expect(link).not.toBeInTheDocument();
  });
});
