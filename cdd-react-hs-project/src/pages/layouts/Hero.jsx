import React from 'react';
import { motion } from 'motion/react';
import '../../styles/Hero.css'; 

const Hero = () => {
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-bg-text-container">
        <motion.h2 
          className="hero-bg-text"
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

      <div className="hero-container">
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
        </div>

        <div className="hero-image-wrapper">
          <img 
             src="/portada-gym.png" 
             alt="Bodybuilder entrenando" 
             className="hero-img"
          />
          <div className="hero-overlay"></div> 
        </div>
      </div>
    </section>
  );
};

export default Hero;