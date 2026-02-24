import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import NavBar from './components/navBar'
import UserNavBar from './components/UserNavBar'
import Services from './components/Services'
import Footer from './components/Footer'
import Hero from './pages/layouts/Hero'
import WhyUs from './pages/layouts/WhyUs'
import LoginUser from './pages/Login/LoginUser'
import LoginAdmin from './pages/Login/LoginAdmin'
import RegisterForm from './pages/Register/RegisterForm'
import SelectTraining from './pages/Bookings/SelectTraining'
import BookingCalendar from './pages/Bookings/BookingCalendar'
import MyReservations from './pages/MyReservations/MyReservations'
import AdminDashboard from './pages/Admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './styles/App.css'

// Componente para la página principal
function HomePage() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? <UserNavBar /> : <NavBar />}
      <Hero />
      <Services />
      <WhyUs />
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<HomePage />} />
        
        {/* Rutas de login */}
        <Route path="/login" element={<Navigate to="/login/usuario" replace />} />
        <Route path="/login/usuario" element={<LoginUser />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        
        {/* Rutas de registro */}
        <Route path="/registro" element={<RegisterForm />} />
        
        {/* Rutas de reservas (protegidas) */}
        <Route 
          path="/reservas" 
          element={
            <ProtectedRoute allowedRoles={['usuario']}>
              <SelectTraining />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reservas/agendar/:trainingId" 
          element={
            <ProtectedRoute allowedRoles={['usuario']}>
              <BookingCalendar />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mis-reservas" 
          element={
            <ProtectedRoute allowedRoles={['usuario']}>
              <MyReservations />
            </ProtectedRoute>
          } 
        />
        
        {/* Rutas de administración (protegidas) */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
