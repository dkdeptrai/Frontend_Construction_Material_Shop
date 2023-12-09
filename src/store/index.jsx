import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index.jsx';
import modalReducer from './Modal.jsx';

const store = configureStore({
  reducer: rootReducer
});

export default store;
