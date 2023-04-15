import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const ingredientesSlice = createSlice({
  name: 'ingrediente',
  initialState: '',
  reducers: {
    setIngredientesGlobal: (state, action) => action.payload,
  },
});

export const { setIngredientesGlobal } = ingredientesSlice.actions;
export default ingredientesSlice.reducer;

export const getAllIngredientes = () => dispatch => {
  const URL = 'https://alimentos.azurewebsites.net/api/v1/alimento';
  axios
    .get(URL)
    .then(res => {
      dispatch(setIngredientesGlobal(res.data.alimentos));
    })
    .catch(err => console.log(err));
};
