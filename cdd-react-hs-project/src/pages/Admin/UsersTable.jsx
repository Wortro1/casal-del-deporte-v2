import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Trash2, Edit, UserPlus } from 'lucide-react';
import { getAllUsuarios } from '../../services/adminService';
import { deleteUser } from '../../services/userService';
import '../../styles/Admin.css';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsuarios();
        // Mapear datos del backend al formato de la tabla
        const mapped = data.map(u => ({
          id: u.id,
          nombre: u.nombre || '',
          apellido: u.apellido || '',
          fullName: `${u.nombre || ''} ${u.apellido || ''}`.trim(),
          telefono: u.telefono || '',
          tipoDeDoc: u.tipoDeDoc || 'CC',
          fechaDeNacimiento: u.fechaDeNacimiento || '',
          haciendoMusculacion: u.haciendoMusculacion || false,
          esDeportistaActivo: u.esDeportistaActivo || false,
        }));
        setUsers(mapped);
      } catch (err) {
        console.error('Error cargando usuarios:', err);
        setError('Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toString().includes(searchTerm) ||
    user.telefono.includes(searchTerm)
  );

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      await deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      alert('Error al eliminar el usuario.');
    }
  };

  if (loading) {
    return (
      <div className="admin-section">
        <p style={{ color: '#9ca3af', textAlign: 'center' }}>Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="admin-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">Usuarios</h2>
        <button className="btn-new-user">
          <UserPlus size={18} />
          Nuevo Usuario
        </button>
      </div>

      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Buscar por nombre o documento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Fecha Nacimiento</th>
              <th>Musculación</th>
              <th>Deportista</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.telefono}</td>
                <td>{user.fechaDeNacimiento || '---'}</td>
                <td>
                  <span className={`badge ${user.haciendoMusculacion ? 'badge-confirmada' : 'badge-cancelada'}`}>
                    {user.haciendoMusculacion ? 'Sí' : 'No'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.esDeportistaActivo ? 'badge-confirmada' : 'badge-cancelada'}`}>
                    {user.esDeportistaActivo ? 'Sí' : 'No'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon btn-edit" title="Editar">
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      title="Eliminar"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="no-results">No se encontraron usuarios</p>
        )}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total Usuarios</p>
          <p className="stat-value">{users.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Practican Musculación</p>
          <p className="stat-value">{users.filter(u => u.haciendoMusculacion).length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Deportistas Activos</p>
          <p className="stat-value">{users.filter(u => u.esDeportistaActivo).length}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default UsersTable;
