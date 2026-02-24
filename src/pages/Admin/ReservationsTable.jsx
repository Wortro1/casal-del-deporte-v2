import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trash2, CheckCircle, XCircle, User, Calendar, Clock } from 'lucide-react';
import { getAllBookings, deleteBooking, updateBooking } from '../../services/bookingService';
import { getAllTrainingTypes } from '../../services/trainingTypeService';
import '../../styles/Admin.css';

const formatDateSpanish = (dateStr) => {
  if (!dateStr) return '---';
  const [year, month, day] = dateStr.split('-');
  const months = [
    'enero','febrero','marzo','abril','mayo','junio',
    'julio','agosto','septiembre','octubre','noviembre','diciembre'
  ];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]}, ${year}`;
};

const ReservationsTable = () => {
  const [reservations, setReservations] = useState([]);
  const [trainingTypes, setTrainingTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await getAllTrainingTypes();
        const typesMap = {};
        types.forEach(t => {
          typesMap[t.id_tipo_entrenamiento] = t.nombre_tipo_entrenamiento;
        });
        setTrainingTypes(typesMap);

        const data = await getAllBookings();
        const mapped = data.map(b => ({
          id: b.id_booking,
          userId: b.user_id,
          trainingType: typesMap[b.training_type] || `Tipo #${b.training_type}`,
          date: b.booking_date || '',
          time: b.booking_hour || '',
          status: b.booking_status || 'confirmada',
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

  const handleConfirmReservation = async (resId) => {
    try {
      await updateBooking(resId, { booking_status: 'confirmada' });
      setReservations(reservations.map(r =>
        r.id === resId ? { ...r, status: 'confirmada' } : r
      ));
    } catch (err) {
      console.error('Error confirmando reserva:', err);
      alert('Error al confirmar la reserva.');
    }
  };

  const handleCancelReservation = async (resId) => {
    try {
      await updateBooking(resId, { booking_status: 'cancelada' });
      setReservations(reservations.map(r =>
        r.id === resId ? { ...r, status: 'cancelada' } : r
      ));
    } catch (err) {
      console.error('Error cancelando reserva:', err);
      alert('Error al cancelar la reserva.');
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
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label" style={{ textTransform: 'none' }}>Total Reservas</p>
          <p className="stat-value">{reservations.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label" style={{ textTransform: 'none' }}>Confirmadas</p>
          <p className="stat-value">{reservations.filter(r => r.status === 'confirmada').length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label" style={{ textTransform: 'none' }}>Pendientes</p>
          <p className="stat-value">{reservations.filter(r => r.status === 'pendiente').length}</p>
        </div>
      </div>

      {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>USUARIO</th>
              <th>ENTRENAMIENTO</th>
              <th>FECHA</th>
              <th>HORA</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={16} color="#45ffca" />
                    {res.userId || '---'}
                  </div>
                </td>
                <td>{res.trainingType}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} color="#45ffca" />
                    {formatDateSpanish(res.date)}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} color="#45ffca" />
                    {res.time}
                  </div>
                </td>
                <td>{getStatusBadge(res.status)}</td>
                <td>
                  <div className="action-buttons">
                    {res.status === 'pendiente' && (
                      <button
                        className="btn-icon btn-confirm"
                        title="Confirmar"
                        onClick={() => handleConfirmReservation(res.id)}
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button
                      className="btn-icon btn-cancel-res"
                      title="Cancelar"
                      onClick={() => handleCancelReservation(res.id)}
                    >
                      <XCircle size={16} />
                    </button>
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
        {reservations.length === 0 && (
          <p className="no-results">No se encontraron reservas</p>
        )}
      </div>
    </motion.div>
  );
};

export default ReservationsTable;
