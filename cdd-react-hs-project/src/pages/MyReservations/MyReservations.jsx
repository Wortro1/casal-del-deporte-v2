import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Dumbbell,
  Heart,
  Zap,
  Users,
  Calendar,
  Clock,
  Trash2,
  X,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAllBookings, deleteBooking } from '../../services/bookingService';
import { getAllTrainingTypes } from '../../services/trainingTypeService';
import UserNavBar from '../../components/UserNavBar';
import '../../styles/MyReservations.css';

const MyReservations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [trainingTypes, setTrainingTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar tipos de entrenamiento para mostrar nombres
        const types = await getAllTrainingTypes();
        const typesMap = {};
        types.forEach(t => {
          typesMap[t.id_tipo_entrenamiento] = t.nombre_tipo_entrenamiento;
        });
        setTrainingTypes(typesMap);

        // Cargar todas las reservas y filtrar por usuario actual
        const allBookings = await getAllBookings();
        const userBookings = allBookings.filter(
          b => b.user_id === user?.id
        );

        // Mapear al formato que espera el componente
        const mapped = userBookings.map(b => ({
          id: b.id_booking,
          trainingType: typesMap[b.training_type] || `Entrenamiento #${b.training_type}`,
          trainingIcon: getIconType(typesMap[b.training_type]),
          startDate: new Date(`${b.booking_date}T${b.booking_hour || '00:00'}`),
          endDate: new Date(new Date(`${b.booking_date}T${b.booking_hour || '00:00'}`).getTime() + 60 * 60 * 1000),
          status: 'confirmada',
          instructor: 'Por asignar',
          location: 'Sala Principal'
        }));

        setReservations(mapped);
      } catch (err) {
        console.error('Error cargando reservas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const getIconType = (name) => {
    if (!name) return 'dumbbell';
    const lower = name.toLowerCase();
    if (lower.includes('muscul')) return 'dumbbell';
    if (lower.includes('cardio')) return 'heart';
    if (lower.includes('funcional') || lower.includes('cross')) return 'zap';
    return 'users';
  };

  const getTrainingIcon = (iconType) => {
    const iconProps = { size: 24 };
    switch (iconType) {
      case 'dumbbell':
        return <Dumbbell {...iconProps} />;
      case 'heart':
        return <Heart {...iconProps} />;
      case 'zap':
        return <Zap {...iconProps} />;
      case 'users':
        return <Users {...iconProps} />;
      default:
        return <Dumbbell {...iconProps} />;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmada':
        return 'badge-confirmada';
      case 'pendiente':
        return 'badge-pendiente';
      case 'cancelada':
        return 'badge-cancelada';
      default:
        return 'badge-pendiente';
    }
  };

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCancelReservation = (id) => {
    setReservations(reservations.map(res =>
      res.id === id ? { ...res, status: 'cancelada' } : res
    ));
    setShowCancelModal(null);
  };

  const handleDeleteReservation = async (id) => {
    try {
      await deleteBooking(id);
      setReservations(reservations.filter(res => res.id !== id));
    } catch (err) {
      console.error('Error eliminando reserva:', err);
      alert('Error al eliminar la reserva.');
    }
    setShowDeleteModal(null);
  };

  // Separar reservas activas y canceladas
  const activeReservations = reservations.filter(
    res => res.status === 'confirmada' || res.status === 'pendiente'
  );
  const cancelledReservations = reservations.filter(res => res.status === 'cancelada');

  // Calcular estadísticas
  const statsPending = reservations.filter(res => res.status === 'pendiente').length;
  const statsConfirmed = reservations.filter(res => res.status === 'confirmada').length;
  const statsTotal = reservations.length;

  if (loading) {
    return (
      <div className="my-reservations-container empty-state">
        <UserNavBar />
        <motion.div
          className="empty-state-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p style={{ color: '#9ca3af', fontSize: '1.2rem' }}>Cargando reservas...</p>
        </motion.div>
      </div>
    );
  }

  // Si no hay reservas
  if (reservations.length === 0) {
    return (
      <div className="my-reservations-container empty-state">
        <UserNavBar />
        <motion.div
          className="empty-state-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Calendar size={80} className="calendar-icon" />
          <h2>Aún no tienes reservas</h2>
          <p>¡Comienza tu transformación hoy! Explora nuestros entrenamientos y crea tu primera reserva.</p>
          <button
            className="btn-nueva-reserva"
            onClick={() => navigate('/reservas')}
          >
            <Plus size={20} /> Nueva Reserva
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="my-reservations-container">
      <UserNavBar />

      {/* Header con botón Nueva Reserva */}
      <motion.div
        className="reservations-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <h1>Mis Reservas</h1>
          <p>Gestiona y monitorea tus reservas de entrenamiento</p>
        </div>
        <button
          className="btn-nueva-reserva-header"
          onClick={() => navigate('/reservas')}
        >
          <Plus size={20} /> Nueva Reserva
        </button>
      </motion.div>

      {/* Cards de Estadísticas */}
      <motion.div
        className="stats-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="stat-card stat-total">
          <div className="stat-icon">
            <Calendar size={32} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total de Reservas</span>
            <span className="stat-value">{statsTotal}</span>
          </div>
        </div>

        <div className="stat-card stat-confirmed">
          <div className="stat-icon">
            <Zap size={32} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Próximas (Confirmadas)</span>
            <span className="stat-value">{statsConfirmed}</span>
          </div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-icon">
            <Clock size={32} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Pendientes</span>
            <span className="stat-value">{statsPending}</span>
          </div>
        </div>
      </motion.div>

      {/* Sección de Próximas Sesiones */}
      {activeReservations.length > 0 && (
        <motion.section
          className="reservations-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="section-title">Próximas Sesiones</h2>
          <div className="reservations-grid">
            {activeReservations.map((reservation, index) => (
              <motion.div
                key={reservation.id}
                className={`reservation-card ${getStatusBadgeClass(reservation.status)}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Icono del entrenamiento */}
                <div className="card-icon-wrapper">
                  {getTrainingIcon(reservation.trainingIcon)}
                </div>

                {/* Contenido de la tarjeta */}
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="training-name">{reservation.trainingType}</h3>
                    <span className={`badge ${getStatusBadgeClass(reservation.status)}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </div>

                  <div className="training-details">
                    <span className="instructor">Instructor: {reservation.instructor}</span>
                    <span className="location">Ubicación: {reservation.location}</span>
                  </div>

                  <div className="card-datetime">
                    <div className="datetime-group">
                      <Calendar size={16} />
                      <span className="formatted-date">{formatDate(reservation.startDate)}</span>
                    </div>
                    <div className="datetime-group">
                      <Clock size={16} />
                      <span className="time">
                        {formatTime(reservation.startDate)} - {formatTime(reservation.endDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="card-actions">
                  <button
                    className="btn-action btn-cancel"
                    onClick={() => setShowCancelModal(reservation.id)}
                    title="Cancelar esta reserva"
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn-action btn-delete"
                    onClick={() => setShowDeleteModal(reservation.id)}
                    title="Eliminar esta reserva"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Sección de Reservas Canceladas */}
      {cancelledReservations.length > 0 && (
        <motion.section
          className="reservations-section cancelled-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="section-title">Reservas Canceladas</h2>
          <div className="reservations-grid">
            {cancelledReservations.map((reservation, index) => (
              <motion.div
                key={reservation.id}
                className="reservation-card badge-cancelada cancelled-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="card-icon-wrapper">
                  {getTrainingIcon(reservation.trainingIcon)}
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <h3 className="training-name strikethrough">{reservation.trainingType}</h3>
                    <span className="badge badge-cancelada">Cancelada</span>
                  </div>

                  <div className="training-details">
                    <span className="instructor strikethrough">Instructor: {reservation.instructor}</span>
                    <span className="location strikethrough">Ubicación: {reservation.location}</span>
                  </div>

                  <div className="card-datetime">
                    <div className="datetime-group">
                      <Calendar size={16} />
                      <span className="formatted-date strikethrough">{formatDate(reservation.startDate)}</span>
                    </div>
                    <div className="datetime-group">
                      <Clock size={16} />
                      <span className="time strikethrough">
                        {formatTime(reservation.startDate)} - {formatTime(reservation.endDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card-actions">
                  <button
                    className="btn-action btn-delete-only"
                    onClick={() => setShowDeleteModal(reservation.id)}
                    title="Eliminar esta reserva"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Modal de confirmación de cancelación */}
      {showCancelModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCancelModal(null)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowCancelModal(null)}
            >
              <X size={24} />
            </button>
            <h3>¿Cancelar esta reserva?</h3>
            <p>Esta acción no se puede deshacer. Tu reserva será marcada como cancelada.</p>
            <div className="modal-actions">
              <button
                className="btn-modal btn-secondary"
                onClick={() => setShowCancelModal(null)}
              >
                Mantener Reserva
              </button>
              <button
                className="btn-modal btn-danger"
                onClick={() => handleCancelReservation(showCancelModal)}
              >
                Sí, Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowDeleteModal(null)}
        >
          <motion.div
            className="modal-content danger"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowDeleteModal(null)}
            >
              <X size={24} />
            </button>
            <h3>¿Eliminar esta reserva permanentemente?</h3>
            <p>Esta acción no se puede deshacer. Se eliminará toda la información de tu reserva.</p>
            <div className="modal-actions">
              <button
                className="btn-modal btn-secondary"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancelar
              </button>
              <button
                className="btn-modal btn-danger"
                onClick={() => handleDeleteReservation(showDeleteModal)}
              >
                Sí, Eliminar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MyReservations;
