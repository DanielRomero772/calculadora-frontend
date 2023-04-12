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
  const URL = 'http://18.216.148.254:4020/api/v1/alimento/ume';
  axios
    .get(URL)
    .then(res => {
      dispatch(setUmeGlobal(res.data.ume));
    })
    .catch(err => console.log(err));
};
