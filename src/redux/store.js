import { configureStore } from '@reduxjs/toolkit';
import { specificationApi } from './apis/specificationApi';
import rootReducer from 'store/reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(specificationApi.middleware)
});

export default store;
