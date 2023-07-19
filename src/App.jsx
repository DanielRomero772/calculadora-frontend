import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectRouter from './components/ProtectRouter';
import Calculadora from './page/Calculadora';
import Home from './page/Home';
import Nav from './page/Nav';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIngredientes } from './store/slices/ingredientes.slice';
import { getAllUme } from './store/slices/ume.slice';
import { getAllRecipes } from './store/slices/recetas.slice';
import Footer from './page/Footer';
import './App.css';

function App() {
  const ume = useSelector(state => state.ume);
  const recetas = useSelector(state => state.recetas);
  //const ume = null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllIngredientes());
    dispatch(getAllUme());
    dispatch(getAllRecipes());
  }, []);

  if (ume && recetas) {
    return (
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectRouter />}>
            <Route path={'/calculadora'} element={<Calculadora />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="load">
        <span className="loader"></span>
      </div>
    );
  }
}

export default App;
