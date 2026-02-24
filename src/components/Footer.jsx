import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const brandName = 'Casa del';
  const brandHighlight = 'Deporte';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footerContainer">
      <div className="footerContent">
        <div className="footerLogo">
          {brandName} <span className="logoHighlight">{brandHighlight}</span>
        </div>
        <p className="footerText">
          © {currentYear} {brandName} {brandHighlight}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;