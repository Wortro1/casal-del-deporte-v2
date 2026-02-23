import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaIdCard } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Login.css';

const LoginUser = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [document, setDocument] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!document.trim()) {
      setError('Por favor ingresa tu documento de identidad');
      return;
    }

    if (document.length < 5) {
      setError('El documento debe tener al menos 5 caracteres');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login(document, 'usuario');
      navigate('/reservas');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Usuario no encontrado. Verifica tu documento o regístrate.');
      } else {
        setError('Error al iniciar sesión. Intenta de nuevo.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Fondo animado oscuro */}
      <div className="login-bg-grid"></div>

      <div className="login-card">
        {/* Logo centrado en la parte superior */}
        <div className="login-header">
          <div className="login-logo">Casa del<span className="logo-highlight">Deporte</span></div>
        </div>

        {/* Indicador de tipo de acceso */}
        <div className="login-access-indicator">
          <FaUser className="access-icon" />
          <span className="access-type">Acceso Usuario</span>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="document" className="form-label">
              <FaIdCard className="label-icon" />
              Documento de Identidad
            </label>
            <input
              type="text"
              id="document"
              className="form-input"
              placeholder="Ingresa tu documento"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-ingresar" disabled={isLoading}>
            {isLoading ? 'Autenticando...' : 'Ingresar'}
          </button>
        </form>

        {/* Enlace a registro */}
        <div className="login-footer">
          <p className="register-link">
            ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
          </p>
          <p className="admin-link">
            ¿Eres administrador? <a href="/login/admin">Inicia sesión aquí</a>
          </p>
        </div>

        {/* Botón Volver al inicio */}
        <button
          className="btn-volver"
          onClick={() => navigate('/')}
          disabled={isLoading}
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default LoginUser;
