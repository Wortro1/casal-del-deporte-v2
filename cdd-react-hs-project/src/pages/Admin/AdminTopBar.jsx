import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import '../../styles/Admin.css';

const AdminTopBar = ({ sidebarOpen, onSidebarToggle, currentSection, onLogout }) => {
  const getSectionTitle = () => {
    const titles = {
      usuarios: 'Gestión de Usuarios',
      reservas: 'Gestión de Reservas',
      tareas: 'Tareas Pendientes'
    };
    return titles[currentSection] || 'Panel de Control';
  };

  return (
    <div className="admin-topbar">
      <div className="topbar-left">
        <button className="topbar-toggle" onClick={onSidebarToggle}>
          <Menu size={24} />
        </button>
        <h2 className="topbar-title">{getSectionTitle()}</h2>
      </div>

      <button className="topbar-logout" onClick={onLogout}>
        <LogOut size={20} />
        Cerrar Sesión
      </button>
    </div>
  );
};

export default AdminTopBar;
