import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AppLayout from './layouts/AppLayout.jsx';
import Home from './pages/Home.jsx';
import ForecastDetails from './pages/ForecastDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useAuth } from './context/AuthContext.jsx';

const About = lazy(() => import('./pages/About.jsx'));

const App = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to={token ? '/home' : '/login'} replace />} />
          <Route path="home" element={<Home />} />
          <Route path="forecast/:city" element={<ForecastDetails />} />
          <Route
            path="about"
            element={(
              <Suspense fallback={<div className="message">Cargando sección...</div>}>
                <About />
              </Suspense>
            )}
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
