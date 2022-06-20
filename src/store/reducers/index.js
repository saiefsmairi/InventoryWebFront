// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './authslice';


// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu ,auth});

export default reducers;
