import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Heart, Zap, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAllTrainingTypes } from '../../services/trainingTypeService';
import UserNavBar from '../../components/UserNavBar';
import '../../styles/Bookings.css';

// Mapeo de iconos por nombre de entrenamiento (fallback)
const ICON_MAP = {
  'musculación': Dumbbell,
  'musculacion': Dumbbell,
  'cardio': Heart,
  'cardio intensivo': Heart,
  'funcional': Zap,
  'crossfit': Zap,
  'clases grupales': Users,
  'yoga': Users,
  'pilates': Users,
};

const COLOR_MAP = {
  'musculación': '#45ffca',
  'musculacion': '#45ffca',
  'cardio': '#ff6b6b',
  'cardio intensivo': '#ff6b6b',
  'funcional': '#ffd700',
  'crossfit': '#ffd700',
  'clases grupales': '#6699ff',
  'yoga': '#6699ff',
  'pilates': '#6699ff',
};

const DEFAULT_COLORS = ['#45ffca', '#ff6b6b', '#ffd700', '#6699ff'];

const SelectTraining = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const data = await getAllTrainingTypes();
        const mapped = data.map((t, index) => {
          const name = t.nombre_tipo_entrenamiento || '';
          const nameLower = name.toLowerCase();
          return {
            id: t.id_tipo_entrenamiento,
            name,
            description: t.descripcion_tipo_entrenamiento || '',
            icon: ICON_MAP[nameLower] || [Dumbbell, Heart, Zap, Users][index % 4],
            color: COLOR_MAP[nameLower] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
          };
        });
        setTrainings(mapped);
      } catch (err) {
        setError('Error al cargar los entrenamientos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  const handleSelectTraining = (trainingId) => {
    navigate(`/reservas/agendar/${trainingId}`);
  };

  if (loading) {
    return (
      <div className="select-training-container">
        <UserNavBar />
        <div className="training-content" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <p style={{ color: '#9ca3af', fontSize: '1.2rem' }}>Cargando entrenamientos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="select-training-container">
      {/* Navbar de Usuario */}
      <UserNavBar />

      {/* Contenido Principal */}
      <div className="training-content">
        <div className="training-header">
          <h1 className="training-title">Selecciona tu Entrenamiento</h1>
          <p className="training-subtitle">Elige el tipo de clase que deseas reservar</p>
        </div>

        {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}

        <div className="trainings-grid">
          {trainings.map((training) => {
            const IconComponent = training.icon;
            return (
              <div key={training.id} className="training-card">
                <div className="card-icon-wrapper">
                  <div
                    className="card-icon"
                    style={{ borderColor: training.color }}
                  >
                    <IconComponent size={40} color={training.color} />
                  </div>
                </div>

                <h3 className="card-title">{training.name}</h3>
                <p className="card-description">{training.description}</p>

                <button
                  className="card-select-btn"
                  onClick={() => handleSelectTraining(training.id)}
                  style={{
                    borderColor: training.color,
                    color: training.color
                  }}
                >
                  Seleccionar →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="training-footer">
        <p>&copy; 2026 Casa del Deporte. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default SelectTraining;
