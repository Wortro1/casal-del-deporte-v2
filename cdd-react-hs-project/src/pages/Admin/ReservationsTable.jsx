import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Trash2, CheckCircle, X } from 'lucide-react';
import { getAllBookings, deleteBooking } from '../../services/bookingService';
import { getAllTrainingTypes } from '../../services/trainingTypeService';
import '../../styles/Admin.css';

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const [trainingTypes, setTrainingTypes] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar tipos de entrenamiento
        const types = await getAllTrainingTypes();
        const typesMap = {};
        types.forEach(t => {
          typesMap[t.id_tipo_entrenamiento] = t.nombre_tipo_entrenamiento;
        });
        setTrainingTypes(typesMap);

        // Cargar todas las reservas
        const data = await getAllBookings();
        const mapped = data.map(b => ({
          id: b.id_booking,
          userId: b.user_id,
          trainingType: typesMap[b.training_type] || `Tipo #${b.training_type}`,
          date: b.booking_date || '',
          time: b.booking_hour || '',
          status: 'confirmada',
        }));
        setReservations(mapped);
      } catch (err) {
        console.error('Error cargando reservas:', err);
        setError('Error al cargar las reservas');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredReservations = reservations.filter(res =>
    res.trainingType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (res.userId && res.userId.toString().includes(searchTerm)) ||
    res.date.includes(searchTerm)
  );

  const handleDeleteReservation = async (resId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta reserva?')) return;
    try {
      await deleteBooking(resId);
      setReservations(reservations.filter(r => r.id !== resId));
    } catch (err) {
      console.error('Error eliminando reserva:', err);
      alert('Error al eliminar la reserva.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmada':
        return <span className="badge badge-confirmada">Confirmada</span>;
      case 'pendiente':
        return <span className="badge badge-pendiente">Pendiente</span>;
      case 'cancelada':
        return <span className="badge badge-cancelada">Cancelada</span>;
      default:
        return <span className="badge badge-pendiente">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="admin-section">
        <h2 className="section-title">Gestión de Reservas</h2>
        <p style={{ color: '#9ca3af', textAlign: 'center' }}>Cargando reservas...</p>
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
        <h2 className="section-title">Gestión de Reservas</h2>
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por tipo, usuario o fecha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Entrenamiento</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((res) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                <td>{res.userId || '---'}</td>
                <td>{res.trainingType}</td>
                <td>{res.date}</td>
                <td>{res.time}</td>
                <td>{getStatusBadge(res.status)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-icon btn-delete"
                      title="Eliminar"
                      onClick={() => handleDeleteReservation(res.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredReservations.length === 0 && (
          <p className="no-results">No se encontraron reservas</p>
        )}
      </div>
    </motion.div>
  );
};

export default ReservationsTable;
