import React from 'react';
import { X } from 'lucide-react';
import '../../styles/Admin.css';

const AdminTopBar = ({ sidebarOpen, onSidebarToggle, currentSection, onLogout }) => {
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
      
      <button className="topbar-close" onClick={onLogout}>
        <X size={24} />
      </button>
    </div>
  );
};

export default AdminTopBar;
