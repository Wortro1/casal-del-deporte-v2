import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '2rem',
          fontFamily: 'monospace'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ff6b6b' }}>
            ⚠️ Error en la Aplicación
          </h1>
          <p style={{ fontSize: '1rem', marginBottom: '2rem', maxWidth: '600px' }}>
            Ha ocurrido un error que impidió cargar la aplicación. Por favor, recarga la página.
          </p>
          <div style={{
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            border: '1px solid #ff6b6b',
            borderRadius: '8px',
            padding: '1.5rem',
            maxWidth: '600px',
            marginBottom: '2rem'
          }}>
            <p style={{ color: '#ff6b6b', margin: '0 0 0.5rem 0' }}>
              Detalles del error:
            </p>
            <pre style={{
              margin: '0.5rem 0 0 0',
              color: '#cccccc',
              overflow: 'auto',
              fontSize: '0.85rem'
            }}>
              {this.state.error?.toString()}
            </pre>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#45ffca',
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 0 15px rgba(69, 255, 202, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            🔄 Recargar la página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
