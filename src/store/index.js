import { configureStore } from '@reduxjs/toolkit';
import trainer from './slices/trainer.slice';
import ingredientes from './slices/ingredientes.slice';
import ume from './slices/ume.slice';

export default configureStore({
  reducer: {
    trainer,
    ingredientes,
    ume,
  },
});
