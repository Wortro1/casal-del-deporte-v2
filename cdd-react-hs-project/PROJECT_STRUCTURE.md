# Estructura del Proyecto - Casa del Deporte

## 📁 Estructura Refactorizada

```
src/
├── App.jsx                          # Componente raíz con rutas principales
├── main.jsx                         # Punto de entrada de la aplicación
│
├── components/                      # Componentes reutilizables
│   ├── Footer.jsx                   # Pie de página
│   ├── navBar.jsx                   # Barra de navegación principal
│   ├── Services.jsx                 # Sección de servicios
│   ├── UserNavBar.jsx               # NavBar para usuarios autenticados
│   └── ProtectedRoute.jsx           # Componente para rutas protegidas
│
├── context/                         # Context API
│   └── AuthContext.jsx              # Contexto global de autenticación
│
├── pages/                           # Páginas de la aplicación
│   ├── Admin/                       # Panel de administración
│   │   ├── AdminDashboard.jsx       # Contenedor principal del admin
│   │   ├── AdminSidebar.jsx         # Sidebar de navegación
│   │   ├── AdminTopBar.jsx          # Barra superior del admin
│   │   ├── UsersTable.jsx           # Tabla de usuarios
│   │   ├── ReservationsTable.jsx    # Tabla de reservas
│   │   └── TasksManager.jsx         # Gestor de tareas
│   │
│   ├── Bookings/                    # Sistema de reservas
│   │   ├── SelectTraining.jsx       # Selección de entrenamientos
│   │   └── BookingCalendar.jsx      # Calendario y horarios
│   │
│   ├── Login/                       # Autenticación de usuarios
│   │   ├── LoginUser.jsx            # Login de usuario regular
│   │   └── LoginAdmin.jsx           # Login de administrador
│   │
│   ├── Register/                    # Registro de usuarios
│   │   └── RegisterForm.jsx         # Formulario de registro
│   │
│   └── layouts/                     # Página de inicio
│       ├── Hero.jsx                 # Sección hero
│       └── WhyUs.jsx                # Sección por qué elegirnos
│
└── styles/                          # Estilos CSS centralizados
    ├── index.css                    # Estilos globales
    ├── App.css                      # Estilos del componente raíz
    ├── Admin.css                    # Estilos del panel admin
    ├── Bookings.css                 # Estilos de reservas
    ├── Login.css                    # Estilos de autenticación
    ├── Register.css                 # Estilos de registro
    ├── Footer.css                   # Estilos del pie de página
    ├── Hero.css                     # Estilos de la sección hero
    ├── Services.css                 # Estilos de servicios
    ├── UserNavBar.css               # Estilos del navbar de usuario
    ├── navBar.css                   # Estilos del navbar principal
    └── whyUs.css                    # Estilos de por qué elegirnos
```

## 🎯 Características Principales

### 1. Autenticación (AuthContext)
- Login de usuario y administrador
- Registro de usuarios
- Protección de rutas con `ProtectedRoute`
- Persistencia de sesión en localStorage

### 2. Sistema de Reservas
- Selección de tipo de entrenamiento
- Calendario de 14 días
- Selector de horarios (13 franjas horarias)
- Confirmación de reserva

### 3. Panel Administrativo
- Gestión de usuarios
- Gestión de reservas
- Gestor de tareas
- Sidebar de navegación
- Estadísticas usuario

### 4. Componentes Compartidos
- NavBar principal con enlaces
- UserNavBar para usuarios autenticados
- Footer
- ProtectedRoute para rutas privadas

## 📦 Dependencias Principales

- **React**: 19.2.0
- **React Router**: 7.13.0
- **Radix UI**: 1.1.1 (componentes accesibles)
- **Lucide React**: 0.395.0 (iconografía)
- **Date-fns**: 3.0.0 (manejo de fechas)
- **Zod**: 4.3.6 (validación de esquemas)
- **React Hook Form**: 7.71.1 (manejo de formularios)

## 🔄 Flujos de Usuario

### Flujo de Usuario Regular
```
Home → Ingresar → Login/Usuario → Selecciona Entrenamiento 
→ Booking Calendar → Confirmar Reserva → Home
```

### Flujo de Administrador
```
Home → Ingresar → Login/Admin → Dashboard Admin 
→ Gestionar (Usuarios/Reservas/Tareas) → Home
```

## Rutas Principales

| Ruta | Componente | Protección |
|------|-----------|-----------|
| `/` | HomePage | Pública |
| `/login/usuario` | LoginUser | Pública |
| `/login/admin` | LoginAdmin | Pública |
| `/registro` | RegisterForm | Pública |
| `/reservas` | SelectTraining | Usuario |
| `/reservas/agendar/:id` | BookingCalendar | Usuario |
| `/admin/*` | AdminDashboard | Admin |

## 🎨 Temas de Color

- **Primario**: #45ffca (Cian fosforescente)
- **Secundario**: #ff6b6b (Rojo para admin)
- **Fondo**: #000000 (Negro)
- **Texto**: #ffffff (Blanco)
- **Neutral**: #9ca3af (Gris)

## 📝 Notas de Arquitectura

1. **CSS Centralizado**: Todos los estilos se encuentran en `src/styles/` para fácil mantenimiento
2. **Context API**: Se usa para estado global de autenticación, sin necesidad de Redux
3. **Componentes Funcionales**: Todo el código usa hooks de React
4. **Validación de Formularios**: Zod + React Hook Form para seguridad
5. **Protección de Rutas**: ProtectedRoute wrapper para controlar acceso

## 🚀 Instrucciones de Desarrollo

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build
npm run preview
```

## 📧 Variables de Entorno

Actualmente, no se requieren variables de entorno. El proyecto usa localStorage para persistencia de sesión.

---

**Última actualización**: 18 de Febrero de 2026
**Versión**: 1.0.0
