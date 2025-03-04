import React from 'react';
import '../../public/css/nav.css';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="nav__header">
        <div className="nav__titulo">
          <div
            className="logo"
            onClick={() => {
              navigate('/');
            }}
          >
            <img src="images/logo.png" alt="" />
          </div>
          <h3>Módulo de Cálculo de Calorías</h3>
        </div>
        <div className="nav__redes">
          <ul>
            <li>
              <a
                href='/'
              >
                Inicio
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
