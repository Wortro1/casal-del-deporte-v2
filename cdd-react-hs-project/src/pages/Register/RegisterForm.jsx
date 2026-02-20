import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@radix-ui/react-switch';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Register.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    // Sección 1: Datos Personales
    document: '',
    fullName: '',
    phone: '',
    birthDate: '',
    // Sección 2: Perfil Deportivo
    musculation: false,
    activeAthlete: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSwitchChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.document.trim()) {
      newErrors.document = 'El documento es requerido';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      setSubmitted(true);

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login/usuario');
      }, 2000);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrors({ submit: 'Ya existe un usuario con ese documento.' });
      } else {
        setErrors({ submit: 'Error al registrarse. Intenta de nuevo.' });
      }
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (submitted) {
    return (
      <div className="register-container">
        <div className="register-bg-grid"></div>
        <div className="register-card success-card">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>¡Registro Exitoso!</h2>
            <p>Tu cuenta ha sido creada correctamente.</p>
            <p className="redirect-text">Redirigiendo al login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-bg-grid"></div>
      <div className="register-card">
        <div className="register-header">
          <button className="btn-back" onClick={handleCancel} disabled={isLoading}>
            <ArrowLeft size={20} />
            Volver
          </button>
          <h1 className="register-title">Crear Cuenta</h1>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {/* SECCIÓN 1: DATOS PERSONALES */}
          <div className="form-section">
            <h2 className="section-title">Datos Personales</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="document" className="form-label">
                  Documento de Identidad *
                </label>
                <input
                  type="text"
                  id="document"
                  name="document"
                  className={`form-input ${errors.document ? 'error' : ''}`}
                  placeholder="Ej: 1234567890"
                  value={formData.document}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {errors.document && <span className="error-text">{errors.document}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Ej: Juan García"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Ej: +57 300 1234567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="birthDate" className="form-label">
                  Fecha de Nacimiento *
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  className={`form-input ${errors.birthDate ? 'error' : ''}`}
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {errors.birthDate && <span className="error-text">{errors.birthDate}</span>}
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: PERFIL DEPORTIVO */}
          <div className="form-section">
            <h2 className="section-title">Perfil Deportivo</h2>

            <div className="switches-container">
              <div className="switch-group">
                <label htmlFor="musculation" className="switch-label">
                  ¿Practicas Musculación?
                </label>
                <Switch
                  id="musculation"
                  checked={formData.musculation}
                  onCheckedChange={(checked) => handleSwitchChange('musculation', checked)}
                  className="switch-root"
                  disabled={isLoading}
                />
              </div>

              <div className="switch-group">
                <label htmlFor="activeAthlete" className="switch-label">
                  ¿Eres Deportista Activo?
                </label>
                <Switch
                  id="activeAthlete"
                  checked={formData.activeAthlete}
                  onCheckedChange={(checked) => handleSwitchChange('activeAthlete', checked)}
                  className="switch-root"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {errors.submit && <div className="error-message">{errors.submit}</div>}

          {/* BOTONES */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel} disabled={isLoading}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
