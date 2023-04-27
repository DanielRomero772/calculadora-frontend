import React from 'react';
import '../../public/css/home.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTrainerGlobal } from '../store/slices/trainer.slice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.name.value.trim()));
    e.target.name.value = '';
    navigate('/calculadora');
  };
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__saludo">
          <h1>!HOLA¡</h1>
          <h3>Bienvenido a la calculadora de calorías</h3>
        </div>
        <div className="home__input">
          <h4>Para iniciar, ingrese el nombre de una receta de comida.</h4>
          <form className="home__form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              autoComplete="of"
              placeholder="Ejemplo: Milanesa de pollo"
            />
            <button>Iniciar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
