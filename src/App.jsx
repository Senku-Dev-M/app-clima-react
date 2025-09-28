import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AppLayout from './layouts/AppLayout.jsx';
import Home from './pages/Home.jsx';
import ForecastDetails from './pages/ForecastDetails.jsx';

const About = lazy(() => import('./pages/About.jsx'));

const App = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="forecast/:city" element={<ForecastDetails />} />
      <Route
        path="about"
        element={(
          <Suspense fallback={<div className="message">Cargando sección...</div>}>
            <About />
          </Suspense>
        )}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default App;
