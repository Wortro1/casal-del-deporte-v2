import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaIdCard } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Login.css';

const LoginAdmin = () => {
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
      await login(document, 'admin');
      navigate('/admin');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Administrador no encontrado. Verifica tu documento.');
      } else {
        setError('Error al iniciar sesión. Intenta de nuevo.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card admin-login-card">
        {/* Título */}
        <h1 className="admin-main-title">Casa del <span className="title-highlight">Deporte</span></h1>
        <p className="admin-access-label">Acceso de Administrador</p>
        <p className="admin-subtitle">Inicia sesión para continuar</p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Campo de Documento */}
          <div className="form-group">
            <label className="form-label">Documento de identidad</label>
            <div className="input-wrapper">
              <FaIdCard className="input-icon" />
              <input
                type="text"
                value={document}
                onChange={(e) => {
                  setDocument(e.target.value);
                  setError('');
                }}
                placeholder="Ingresa tu número de documento"
                className={`form-input ${error ? 'input-error' : ''}`}
                disabled={isLoading}
                autoFocus
              />
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Botón de Login */}
          <button
            type="submit"
            className="login-btn admin-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="btn-loading">
                <div className="spinner"></div>
                <span>Verificando...</span>
              </div>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        {/* Link de retorno */}
        <div className="admin-login-footer">
          <p className="user-link">
            ¿Eres usuario? <a href="/login/usuario">Inicia sesión aquí</a>
          </p>
          <button
            className="link-btn"
            onClick={() => navigate('/')}
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
