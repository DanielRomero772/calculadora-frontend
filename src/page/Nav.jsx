import React from 'react';
import '../../public/css/nav.css';
import { useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { GrClose } from 'react-icons/gr';

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
          <h3>Predicción de calorías con TensorFlow</h3>
        </div>
        <div className="nav__redes">
          <ul>
            <li>
              <a
                href="https://github.com/Cristofer-IA/calculadora-frontend.git"
                _blank
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
