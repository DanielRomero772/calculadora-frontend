import React, {useState, useEffect} from 'react';
import '../../public/css/home.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setTrainerGlobal } from '../store/slices/trainer.slice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const recetas = useSelector(state => state.recetas);

  const [recetasFilter, setRecetasFilter] = useState();
  
  useEffect(() => {
    console.log(recetas);
    if (recetas) {
      setRecetasFilter(recetas);
    }
  }, [recetas]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.name.value.trim()));
    e.target.name.value = '';
    navigate('/calculadora');
  };

  const handleSelectedRecipe = (receta) =>{
    console.log(receta);
    dispatch(setTrainerGlobal(receta.nombre));
    // dispatch(getIngredientesDeLaReceta(receta.id));
    navigate('/calculadora?receta_id='+receta.id);
  }
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__saludo">
          <h1>Módulo de Cálculo de Calorías</h1>
          <p>En este módulo podrá realizar el cálculo de calorías de sus recetas en base a sus ingredientes y las cantidades de los mismos.</p>
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
        <div className="home__input">

        <h3>Recetas precargadas</h3>
          <div className="card__container">
            {recetasFilter?.map(receta => (
              <div className="card" key={receta.id} onClick={()=>handleSelectedRecipe(receta)}>
                <img src={`${receta.imageUrl}`} alt={receta.nombre}/>
                  <h4><b>{receta.nombre}</b></h4>
              </div>
            ))}
          </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
