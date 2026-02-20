// src/config/constants.js
// Configuración centralizada del proyecto

export const COLORS = {
  PRIMARY: '#45ffca',
  SECONDARY: '#ff6b6b',
  ACCENT_YELLOW: '#ffd700',
  ACCENT_BLUE: '#6699ff',
  BACKGROUND: '#000000',
  CARD_BG: 'rgba(15, 15, 20, 0.7)',
  BORDER: 'rgba(69, 255, 202, 0.3)',
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: '#9ca3af',
  TEXT_MUTED: '#666666',
  ERROR: '#ff6b6b'
};

export const TRAINING_TYPES = [
  {
    id: 1,
    name: 'Musculación',
    description: 'Entrenamientos enfocados en ganancia muscular con pesas y máquinas. Ideal para desarrollar fuerza y volumen.',
    color: '#45ffca'
  },
  {
    id: 2,
    name: 'Cardio Intensivo',
    description: 'Rutinas cardiovasculares de alta intensidad. Quema de calorías y mejora de resistencia aeróbica.',
    color: '#ff6b6b'
  },
  {
    id: 3,
    name: 'Funcional',
    description: 'Entrenamientos funcionales utilizando diferentes estímulos. Mejora coordinación y flexibilidad.',
    color: '#ffd700'
  },
  {
    id: 4,
    name: 'Clases Grupales',
    description: 'Clases dinámicas en grupo: yoga, zumba, boxeo. Ambiente motivador y comunidad.',
    color: '#6699ff'
  }
];

export const BOOKING_HOURS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export const ADMIN_SECTIONS = {
  USUARIOS: 'usuarios',
  RESERVAS: 'reservas',
  TAREAS: 'tareas'
};

export const USER_ROLES = {
  USUARIO: 'usuario',
  ADMIN: 'admin'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  LOGIN_USUARIO: '/login/usuario',
  LOGIN_ADMIN: '/login/admin',
  REGISTRO: '/registro',
  RESERVAS: '/reservas',
  RESERVAS_AGENDAR: '/reservas/agendar',
  ADMIN: '/admin'
};

export const TASK_PRIORITIES = [
  { id: 'alta', label: 'Alta', color: '#ff6b6b' },
  { id: 'media', label: 'Media', color: '#ffd700' },
  { id: 'baja', label: 'Baja', color: '#45ffca' }
];

export const RESERVATION_STATUSES = [
  { id: 'confirmada', label: 'Confirmada', color: '#45ffca' },
  { id: 'pendiente', label: 'Pendiente', color: '#ffd700' },
  { id: 'cancelada', label: 'Cancelada', color: '#ff6b6b' }
];
