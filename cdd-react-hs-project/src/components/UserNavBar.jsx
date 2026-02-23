import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/UserNavBar.css';

const UserNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;
  const isAdmin = user?.userType === 'admin';

  return (
    <nav className="user-navbar">
      <div className="navbar-left">
        <button 
          className="navbar-brand"
          onClick={() => navigate('/')}
        >
          Casa del <span className="brand-highlight">Deporte</span>
        </button>

        <div className="navbar-links">
          <a 
            href="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <Home size={18} />
            Inicio
          </a>
          {isAdmin ? (
            <a 
              href="/admin"
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </a>
          ) : (
            <a 
              href="/mis-reservas"
              className={`nav-link ${isActive('/mis-reservas') ? 'active' : ''}`}
            >
              <Calendar size={18} />
              Mis Reservas
            </a>
          )}
        </div>
      </div>

      <button className="btn-logout-header" onClick={handleLogout}>
        <LogOut size={18} />
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default UserNavBar;
