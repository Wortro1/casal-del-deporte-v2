import React from 'react';
import { Users, Calendar, CheckSquare } from 'lucide-react';
import '../../styles/Admin.css';

const AdminSidebar = ({ isOpen, currentSection, onSectionChange }) => {
  const menuItems = [
    {
      id: 'usuarios',
      label: 'Usuarios',
      icon: Users
    },
    {
      id: 'reservas',
      label: 'Reservas',
      icon: Calendar
    },
    {
      id: 'tareas',
      label: 'Tareas',
      icon: CheckSquare
    }
  ];

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Casa del <span className="logo-highlight">Deporte</span></h1>
        <p className="sidebar-subtitle">Panel de Administración</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentSection === item.id;

          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <IconComponent size={20} />
              <span>{item.label}</span>
              {isActive && <div className="active-indicator"></div>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p>&copy; 2026 Casa del Deporte</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
