import React from 'react';
import '../../public/css/ume.css';
import { useSelector } from 'react-redux';

const Ume = () => {
  const ume = useSelector(state => state.ume);
  return (
    <div className="container-table">
      <h3>Descripción de las unidades de mendida de los alimentos</h3>
      <table className="table__ume">
        <thead>
          <tr>
            <th>#</th>
            <th>UME</th>
            <th>SIGNIFICADO</th>
            <th>FACTOR</th>
            <th>UME FACTOR</th>
          </tr>
        </thead>
        <tbody>
          {ume?.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.ume}</td>
              <td>{item.significado}</td>
              <td>{item.factor}</td>
              <td>{item.umeFactor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ume;
