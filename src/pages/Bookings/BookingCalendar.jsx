import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, addDays, isToday, isTomorrow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, CheckCircle, ArrowLeft, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { createBooking } from '../../services/bookingService';
import { getTrainingTypeById } from '../../services/trainingTypeService';
import { getAllAdmins } from '../../services/adminService';
import UserNavBar from '../../components/UserNavBar';
import '../../styles/Bookings.css';

const BookingCalendar = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [booking, setBooking] = useState(null);
  const [currentTraining, setCurrentTraining] = useState({ name: 'Entrenamiento', color: '#45ffca' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar info del tipo de entrenamiento y lista de admins
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trainingData, adminsData] = await Promise.all([
          getTrainingTypeById(trainingId),
          getAllAdmins()
        ]);

        setCurrentTraining({
          name: trainingData.nombre_tipo_entrenamiento || 'Entrenamiento',
          color: '#45ffca',
        });

        setAdmins(adminsData);
      } catch (err) {
        console.error('Error cargando datos:', err);
      }
    };
    fetchData();
  }, [trainingId]);

  // Generar próximos 14 días
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
  };

  const dates = generateDates();

  // Horarios disponibles
  const times = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleAdminSelect = (admin) => {
    setSelectedAdmin(admin);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedAdmin || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const bookingDTO = {
        booking_date: format(selectedDate, 'yyyy-MM-dd'),
        booking_hour: selectedTime,
        training_type: parseInt(trainingId),
        user_id: user?.id || null,
        admin_id: selectedAdmin.id,
      };

      const created = await createBooking(bookingDTO);
      console.log('Reserva creada:', created);

      setBooking({
        trainingName: currentTraining.name,
        date: selectedDate,
        time: selectedTime,
        adminName: `${selectedAdmin.nombre} ${selectedAdmin.apellido}`
      });

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/mis-reservas');
      }, 2000);
    } catch (err) {
      console.error('Error al crear reserva:', err);
      alert('Error al crear la reserva. Intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  if (booking) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'rgba(15, 15, 20, 0.95)',
          border: '2px solid #45ffca',
          borderRadius: '15px',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{
            fontSize: '4rem',
            color: '#45ffca',
            marginBottom: '1rem'
          }}>
            ✓
          </div>
          <h2 style={{ color: '#45ffca', margin: '0 0 1rem 0' }}>
            ¡Reserva Confirmada!
          </h2>
          <p style={{ color: '#cccccc', margin: '0.5rem 0' }}>
            {booking.trainingName}
          </p>
          <p style={{ color: '#9ca3af', margin: '0.5rem 0' }}>
            {format(booking.date, 'EEEE dd \'de\' MMMM', { locale: es })} a las {booking.time}
          </p>
          <p style={{ color: '#9ca3af', margin: '0.5rem 0' }}>
            Instructor: {booking.adminName}
          </p>
          <p style={{ color: '#999999', fontSize: '0.85rem', marginTop: '1rem' }}>
            Redirigiendo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container-full">
      {/* UserNavBar */}
      <UserNavBar />

      {/* Header con botón de volver */}
      <div className="booking-header-with-logout">
        <div className="booking-header">
          <button className="btn-back-booking" onClick={() => navigate('/reservas')}>
            <ArrowLeft size={20} />
            Volver a entrenamientos
          </button>
          <h1 className="booking-title">Agendar: {currentTraining.name}</h1>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="booking-content">
        {/* Columna 1: Selector de Fecha */}
        <div className="booking-column">
          <h2 className="column-title">
            <Calendar size={20} />
            Selecciona Fecha
          </h2>

          <div className="dates-list">
            {dates.map((date, index) => {
              const isSelected = selectedDate &&
                format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');

              let dateLabel = format(date, 'EEEE', { locale: es });
              let dateValue = format(date, 'dd MMM', { locale: es });

              if (isToday(date)) {
                dateLabel = 'Hoy';
              } else if (isTomorrow(date)) {
                dateLabel = 'Mañana';
              }

              return (
                <button
                  key={index}
                  className={`date-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleDateSelect(date)}
                >
                  <div className="date-info">
                    <span className="date-day">{dateLabel}</span>
                    <span className="date-value">{dateValue}</span>
                  </div>
                  {isSelected && <CheckCircle size={20} color={currentTraining.color} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Columna 2: Selector de Hora */}
        <div className="booking-column">
          <h2 className="column-title">
            <Clock size={20} />
            Selecciona Hora
          </h2>

          <div className="times-grid">
            {times.map((time) => {
              const isSelected = selectedTime === time;
              const isDisabled = !selectedDate;

              return (
                <button
                  key={time}
                  className={`time-btn ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => !isDisabled && handleTimeSelect(time)}
                  disabled={isDisabled}
                  style={isSelected ? { borderColor: currentTraining.color, color: currentTraining.color } : {}}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Columna 3: Selector de Instructor (Admin) */}
        <div className="booking-column">
          <h2 className="column-title">
            <User size={20} />
            Selecciona Instructor
          </h2>

          <div className="admins-list">
            {admins.length === 0 ? (
              <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>Cargando instructores...</p>
            ) : (
              admins.map((admin) => {
                const isSelected = selectedAdmin?.id === admin.id;
                const isDisabled = !selectedDate || !selectedTime;

                return (
                  <button
                    key={admin.id}
                    className={`time-btn ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`} // Reusamos clase time-btn para estilo consistente
                    onClick={() => !isDisabled && handleAdminSelect(admin)}
                    disabled={isDisabled}
                    style={{
                      ...isSelected ? { borderColor: currentTraining.color, color: currentTraining.color } : {},
                      width: '100%',
                      textAlign: 'left',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{admin.nombre} {admin.apellido}</span>
                    {isSelected && <CheckCircle size={16} />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Resumen de Reserva */}
      {selectedDate && selectedTime && selectedAdmin && (
        <div className="booking-summary">
          <div className="summary-content">
            <h3 className="summary-title">Resumen de Reserva</h3>

            <div className="summary-details">
              <div className="summary-item">
                <span className="summary-label">Entrenamiento:</span>
                <span className="summary-value" style={{ color: currentTraining.color }}>
                  {currentTraining.name}
                </span>
              </div>

              <div className="summary-item">
                <span className="summary-label">Fecha:</span>
                <span className="summary-value">
                  {format(selectedDate, 'EEEE dd \'de\' MMMM \'de\' yyyy', { locale: es })}
                </span>
              </div>

              <div className="summary-item">
                <span className="summary-label">Hora:</span>
                <span className="summary-value">{selectedTime}</span>
              </div>

              <div className="summary-item">
                <span className="summary-label">Instructor:</span>
                <span className="summary-value">{selectedAdmin.nombre} {selectedAdmin.apellido}</span>
              </div>
            </div>
          </div>

          <button
            className="btn-confirm-booking"
            onClick={handleConfirmBooking}
            style={{ borderColor: currentTraining.color, background: currentTraining.color }}
          >
            Confirmar Reserva
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
