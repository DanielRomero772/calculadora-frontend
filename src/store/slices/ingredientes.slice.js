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
  const URL = `${import.meta.env.VITE_API_COMEDORES_COMUNITARIOS}/ingredientes`;
  axios
    .get(URL)
    .then(res => {
      dispatch(setIngredientesGlobal(res.data.data.ingredientes));
    })
    .catch(err => console.log(err));
};
