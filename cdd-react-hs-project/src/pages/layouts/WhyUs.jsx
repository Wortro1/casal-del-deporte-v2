import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/whyUs.css';

const WhyUs = () => {
  return (
    <section id="nosotros" className="why-us-section">
      <div className="why-us-container">
        <div className="why-us-image-side">
          <div className="glow-effect"></div> 
          <img 
            src="./public/why-us-img.png" 
            alt="Entrenamiento profesional" 
            className="why-us-img"
          />
        </div>

        <div className="why-us-text-side">
          <h2 className="why-us-title">
            Entrena con los <span className="highlight-menta">Mejores</span> del mundo fitness
          </h2>
          <p className="why-us-description">
            En Casa del Deporte, no solo te ofrecemos máquinas, te ofrecemos una 
            metodología probada para transformar tu vida. Contamos con expertos 
            certificados y tecnología de punta para monitorear tu progreso.
          </p>
          <button className="btn-hero" onClick={() => document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' })}>
            Únetenos
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;