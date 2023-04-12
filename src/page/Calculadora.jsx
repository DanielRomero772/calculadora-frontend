import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../public/css/calculadora.css';
import Ume from './Ume';
import * as tf from '@tensorflow/tfjs';

const Calculadora = () => {
  const ingredientes = useSelector(state => state.ingredientes);
  const { trainer } = useSelector(state => state);

  const [alimentoFilter, setAlimentoFilter] = useState();
  const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState([]);
  const [mensaje, setMensaje] = useState();
  const [modelo, setModelo] = useState();
  const [caloriasTotales, setCaloriasTotales] = useState();

  useEffect(() => {
    if (ingredientes) {
      setAlimentoFilter(ingredientes);
    }
  }, [ingredientes]);

  useEffect(() => {
    if (ingredienteSeleccionado.length === 0) {
      setMensaje('Agregue ingredientes a este plato');
    } else {
      setMensaje('');
    }

    totalCalorias();
  }, [ingredienteSeleccionado]);

  const handleChange = e => {
    const inputValue = e.target.value.toLowerCase().trim();
    const filter = ingredientes.filter(nombre =>
      nombre.alimento.toLowerCase().includes(inputValue)
    );
    setAlimentoFilter(filter);
  };

  const handleClic = ingrediente => {
    const temp = ingredienteSeleccionado.filter(
      item => item.id === ingrediente.id
    );
    if (temp.length > 0) {
      console.log('El alimento seleccionado ya está en la lista.');
      setMensaje('* El alimento seleccionado ya está en la lista');
      //console.log(temp);
    } else {
      const objtIngrediente = {
        id: ingrediente.id,
        alimento: ingrediente.alimento,
        racion: ingrediente.racion,
        ume: ingrediente.ume,
        carbohidratos: ingrediente.carbohidratos,
        grasas: ingrediente.grasas,
        proteinas: ingrediente.proteinas,
        fibra: ingrediente.fibra,
        alcohol: ingrediente.alcohol,
        cantidad: 0,
        calorias: 0,
      };
      const nuevoArray = [...ingredienteSeleccionado];
      nuevoArray.push(objtIngrediente);
      setIngredienteSeleccionado(nuevoArray);
    }
  };

  const handleDelete = id => {
    const index = ingredienteSeleccionado.findIndex(item => {
      return item.id === id;
    });

    if (index !== -1) {
      const nuevoArray = [...ingredienteSeleccionado];
      nuevoArray.splice(index, 1);
      setIngredienteSeleccionado(nuevoArray);
    }
  };

  const cargarModelo = async () => {
    console.log('Cargando modelo...');
    const model = await tf.loadLayersModel('../../public/utils/model.json');
    setModelo(model);
    console.log('Modelo cargado...');
  };

  useEffect(() => {
    cargarModelo();
  }, []);

  const handleEdit = (e, id) => {
    //console.log(id, e.target.value);
    let cantidad = 0;
    if (e.target.value) {
      cantidad = e.target.value;
    }
    const index = ingredienteSeleccionado.findIndex(item => {
      return item.id === id;
    });

    if (index !== -1) {
      ingredienteSeleccionado[index].cantidad = parseFloat(cantidad);
    }
    console.log(ingredienteSeleccionado[index].cantidad);
  };

  const calcularCalorias = () => {
    ingredienteSeleccionado.forEach((item, index, arr) => {
      const proteinas = item.proteinas * item.cantidad;
      const grasas = item.grasas * item.cantidad;
      const carbohidratos = item.carbohidratos * item.cantidad;
      const fibra = item.fibra * item.cantidad;
      const alcohol = item.alcohol * item.cantidad;

      const tensor = tf.tensor2d([
        [grasas, carbohidratos, proteinas, alcohol, fibra],
      ]);
      const prediccion = modelo.predict(tensor);
      item.calorias = prediccion.dataSync()[0].toFixed(2);
    });

    const newArr = [...ingredienteSeleccionado];
    setIngredienteSeleccionado(newArr);
    console.log(ingredienteSeleccionado);
  };

  const totalCalorias = () => {
    let temp = 0;
    ingredienteSeleccionado.forEach(item => {
      temp += +item.calorias;
    });
    setCaloriasTotales(temp.toFixed(2));
  };

  return (
    <div className="calc">
      <div className="calc__container">
        <div className="calc__body">
          <div className="calc__titulo">
            <h3>Plato:</h3>
            <h1>{trainer}</h1>
          </div>
          <div className="calc__lista">
            <table className="table">
              <thead className="table__head">
                <tr>
                  <th>INGREDIENTES</th>
                  <th>CANTIDAD</th>
                  <th>UME</th>
                  <th>CALORÍAS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="table__body">
                {ingredienteSeleccionado.map(item => (
                  <tr key={item.id}>
                    <td>{item.alimento}</td>
                    <td>
                      <input
                        onChange={e => {
                          handleEdit(e, item.id);
                        }}
                        type="number"
                        autoComplete="of"
                        placeholder={item.cantidad}
                      />
                    </td>
                    <td>{item.ume}</td>
                    <td>{item.calorias} cal.</td>
                    <td>
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        x
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mensaje">
              <p>{mensaje}</p>
            </div>
            <div className="total_caloria">
              <p>
                Total: <b>{caloriasTotales}</b> calorías
              </p>
            </div>
            <button onClick={calcularCalorias} id="btn_predecir">
              Predecir calorías
            </button>
            <br />
            <br />
            <br />
          </div>
        </div>
        <div className="alimentos">
          <h3>Lista de ingredientes</h3>

          <input type="text" placeholder="Buscar" onChange={handleChange} />

          <div className="alimentos__lista">
            {alimentoFilter?.map(ingrediente => (
              <div key={ingrediente.id}>
                <p>{ingrediente.alimento}</p>
                <button
                  onClick={() => {
                    handleClic(ingrediente);
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="unida-de-medida">
        <Ume />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Calculadora;
