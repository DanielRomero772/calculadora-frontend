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
  const URL = 'http://127.0.0.1:3000/api/v1/unidades-de-medida';
  axios
    .get(URL)
    .then(res => {
      dispatch(setUmeGlobal(res.data.data.ume));
    })
    .catch(err => console.log(err));
};
