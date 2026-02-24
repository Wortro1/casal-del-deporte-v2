import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Home } from 'lucide-react';
import '../../styles/Admin.css';

const AdminTopBar = ({ sidebarOpen, onSidebarToggle, currentSection, onLogout }) => {
  const navigate = useNavigate();

  const getSectionTitle = () => {
    const titles = {
      usuarios: 'Usuarios',
      reservas: 'Reservas',
      tareas: 'Tareas'
    };
    return titles[currentSection] || 'Panel';
  };

  return (
    <div className="admin-topbar">
      <div className="topbar-logo-section">
        <h1 className="topbar-logo"><span className="logo-highlight">Deporte</span></h1>
        <p className="topbar-subtitle">Panel de Administración</p>
      </div>
      
      <div className="topbar-section-title">{getSectionTitle()}</div>
      
      <div className="topbar-actions">
        <button 
          className="topbar-home" 
          onClick={() => navigate('/')}
          title="Ir a inicio"
        >
          <Home size={24} />
        </button>
        <button 
          className="topbar-close" 
          onClick={onLogout}
          title="Cerrar sesión"
        >
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
};

export default AdminTopBar;
