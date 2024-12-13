import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { specificationApi } from 'redux/apis/specificationApi';
import { userApi } from 'redux/apis/userApi';

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  [specificationApi.reducerPath]: specificationApi.reducer, // Include the API reducer
  [userApi.reducerPath]: userApi.reducer
});

export default rootReducer;
