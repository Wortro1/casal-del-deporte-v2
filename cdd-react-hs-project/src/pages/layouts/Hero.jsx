import React from 'react';
import { motion } from 'motion/react';
// Importamos los estilos subiendo un nivel (../) hacia la carpeta styles
import '../../styles/Hero.css'; 

const Hero = () => {
  return (
    <section id="inicio" className="hero-section">
      
      {/* --- FONDO ANIMADO --- */}
      <div className="hero-bg-text-container">
        <motion.h2 
          className="hero-bg-text"
          // Animación: Se mueve de izquierda (-100%) a derecha (100%)
          animate={{ x: ['-100%', '100%'] }} 
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          FITNESS
        </motion.h2>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="hero-container">
        
        {/* Columna Izquierda: Textos */}
        <div className="hero-text-content">
          <h1 className="hero-title">
            Construye el Físico <br /> de tus sueños
          </h1>
          <h2 className="hero-subtitle">
            Un cuerpo y una mente saludable
          </h2>
          <p className="hero-description">
            Entrena con los mejores profesionales en instalaciones de primera clase. 
            Tu transformación empieza hoy mismo.
          </p>
          <button className="btn-hero">
            Únetenos
          </button>
        </div>

        {/* Columna Derecha: Imagen */}
        <div className="hero-image-wrapper">
          <img 
             src="./public/portada-gym.png" 
             alt="Bodybuilder entrenando" 
             className="hero-img"
          />
          {/* Capa oscura para que la imagen se integre con el fondo */}
          <div className="hero-overlay"></div> 
        </div>

      </div>
    </section>
  );
};

export default Hero;