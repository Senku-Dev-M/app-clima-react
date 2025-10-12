import { NavLink, Outlet } from 'react-router-dom';
import ThemeSwitcher from '../components/ThemeSwitcher.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const AppLayout = () => {
  const { theme } = useTheme();
  const { logout } = useAuth();

  return (
    <div className={`app-container ${theme}-theme`}>
      <div className="app-wrapper">
        <header className="app-header">
          <nav className="navigation">
            <NavLink to="/home" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Inicio
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Acerca de
            </NavLink>
          </nav>
          <div className="header-controls">
            <ThemeSwitcher />
            <button onClick={logout} className="logout-button">Cerrar Sesión</button>
          </div>
        </header>
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
