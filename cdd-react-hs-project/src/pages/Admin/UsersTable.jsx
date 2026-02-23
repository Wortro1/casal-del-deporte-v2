import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Trash2, Edit, UserPlus, X } from 'lucide-react';
import { getAllUsuarios, createUsuarioExterno } from '../../services/adminService';
import { deleteUser } from '../../services/userService';
import '../../styles/Admin.css';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    tipoDeDoc: 'CC',
    documento: '',
    fechaDeNacimiento: '',
    haciendoMusculacion: false,
    esDeportistaActivo: false,
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.apellido.trim()) {
      alert('El nombre y apellido son requeridos');
      return;
    }
    if (!formData.documento.trim()) {
      alert('El número de documento es requerido');
      return;
    }

    setSubmitting(true);
    try {
      // Asegurar que se envía el documento como id
      const usuarioData = {
        ...formData,
        id: parseInt(formData.documento) || formData.documento
      };
      
      const nuevoUsuario = await createUsuarioExterno(usuarioData);
      setUsers([...users, {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        fullName: `${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`,
        telefono: nuevoUsuario.telefono || '',
        tipoDeDoc: nuevoUsuario.tipoDeDoc || 'CC',
        fechaDeNacimiento: nuevoUsuario.fechaDeNacimiento || '',
        haciendoMusculacion: nuevoUsuario.haciendoMusculacion || false,
        esDeportistaActivo: nuevoUsuario.esDeportistaActivo || false,
      }]);
      setShowModal(false);
      setFormData({
        nombre: '',
        apellido: '',
        telefono: '',
        tipoDeDoc: 'CC',
        documento: '',
        fechaDeNacimiento: '',
        haciendoMusculacion: false,
        esDeportistaActivo: false,
      });
      alert('Usuario creado exitosamente');
    } catch (err) {
      console.error('Error creando usuario:', err);
      alert('Error al crear el usuario: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
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
        <button className="btn-new-user" onClick={() => setShowModal(true)}>
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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="modal-header">
              <h3>Crear Nuevo Usuario</h3>
              <button
                className="btn-close"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre del usuario"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellido *</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    placeholder="Apellido del usuario"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de Documento</label>
                  <select
                    name="tipoDeDoc"
                    value={formData.tipoDeDoc}
                    onChange={handleInputChange}
                  >
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="PA">Pasaporte</option>
                    <option value="DNI">DNI</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Número de Documento *</label>
                  <input
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleInputChange}
                    placeholder="Número de documento"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Número de teléfono"
                  />
                </div>
                <div className="form-group">
                  <label>Fecha de Nacimiento</label>
                  <input
                    type="date"
                    name="fechaDeNacimiento"
                    value={formData.fechaDeNacimiento}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="haciendoMusculacion"
                      checked={formData.haciendoMusculacion}
                      onChange={handleInputChange}
                    />
                    Haciendo Musculación
                  </label>
                </div>
                <div className="form-group checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="esDeportistaActivo"
                      checked={formData.esDeportistaActivo}
                      onChange={handleInputChange}
                    />
                    Deportista Activo
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={submitting}
                >
                  {submitting ? 'Creando...' : 'Crear Usuario'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default UsersTable;
