import { configureStore } from '@reduxjs/toolkit';
import { specificationApi } from './apis/specificationApi';
import { userApi } from './apis/userApi';
import rootReducer from 'store/reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(specificationApi.middleware).concat(userApi.middleware)
});

export default store;
