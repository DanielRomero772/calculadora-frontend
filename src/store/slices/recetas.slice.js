import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const recetasSlice = createSlice({
  name: 'recetas',
  initialState: '',
  reducers: {
    setRecetasGlobal: (state, action) => action.payload,
  },
});

export const { setRecetasGlobal } = recetasSlice.actions;
export default recetasSlice.reducer;

export const getAllRecipes = () => dispatch => {
  const URL = 'http://127.0.0.1:3300/api/v1/recetas';
  axios
    .get(URL)
    .then(res => {
      console.log(res.data.data.recetas)
      dispatch(setRecetasGlobal(res.data.data.recetas));
    })
    .catch(err => console.log(err));
};
