import { NavLink, Outlet } from 'react-router-dom';
import ThemeSwitcher from '../components/ThemeSwitcher.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const AppLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}-theme`}>
      <div className="app-wrapper">
        <header className="app-header">
          <nav className="navigation">
            <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Inicio
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              Acerca de
            </NavLink>
          </nav>
          <ThemeSwitcher />
        </header>
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
