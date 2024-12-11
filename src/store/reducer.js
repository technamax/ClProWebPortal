import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { specificationApi } from 'redux/apis/specificationApi';

// ==============================|| COMBINE REDUCER ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  [specificationApi.reducerPath]: specificationApi.reducer // Include the API reducer
});

export default rootReducer;
