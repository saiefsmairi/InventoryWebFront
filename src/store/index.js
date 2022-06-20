// third-party
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/reducers/authslice'
// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: reducers,
   // auth: authReducer,

});

const { dispatch } = store;

export { store, dispatch };
