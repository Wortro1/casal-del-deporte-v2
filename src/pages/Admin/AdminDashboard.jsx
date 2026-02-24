import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import UsersTable from './UsersTable';
import ReservationsTable from './ReservationsTable';
import TasksManager from './TasksManager';
import '../../styles/Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState('usuarios');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      {/* SIDEBAR */}
      <AdminSidebar 
        isOpen={sidebarOpen}
        currentSection={currentSection}
        onSectionChange={(section) => {
          setCurrentSection(section);
          setSidebarOpen(false);
        }}
      />

      {/* MAIN CONTENT */}
      <div className="admin-main">
        {/* TOP BAR */}
        <AdminTopBar 
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          currentSection={currentSection}
          onLogout={handleLogout}
        />

        {/* CONTENIDO */}
        <div className="admin-content">
          {currentSection === 'usuarios' && <UsersTable />}
          {currentSection === 'reservas' && <ReservationsTable />}
          {currentSection === 'tareas' && <TasksManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
