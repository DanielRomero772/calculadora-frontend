import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const umeSlice = createSlice({
  name: 'ume',
  initialState: '',
  reducers: {
    setUmeGlobal: (state, action) => action.payload,
  },
});

export const { setUmeGlobal } = umeSlice.actions;
export default umeSlice.reducer;

export const getAllUme = () => dispatch => {
  const URL = `${import.meta.env.VITE_API_COMEDORES_COMUNITARIOS}/unidades-de-medida`;
  axios
    .get(URL)
    .then(res => {
      dispatch(setUmeGlobal(res.data.data.ume));
    })
    .catch(err => console.log(err));
};
