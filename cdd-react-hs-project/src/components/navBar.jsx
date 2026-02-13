import React from 'react';
import '../styles/navBar.css';

const NavBar = () => {
  // Variables internas en camelCase según la orden
  const navLinks = [
    { name: 'Inicio', path: '#inicio' },
    { name: 'Servicios', path: '#servicios' },
    { name: 'Sobre nosotros', path: '#nosotros' }
  ];

  const brandName = 'Casa del';
  const brandHighlight = 'Deporte';

  return (
    <nav className="navBarContainer">
      <div className="navBarLogo">
        {brandName} <span className="logoHighlight">{brandHighlight}</span>
      </div>
      
      <ul className="navBarMenu">
        {navLinks.map((linkItem) => (
          <li key={linkItem.name}>
            <a href={linkItem.path}>{linkItem.name}</a>
          </li>
        ))}
      </ul>

      <div className="navBarActions">
        <button className="btnRegisterNav">Regístrate</button>
      </div>
    </nav>
  );
};

export default NavBar;