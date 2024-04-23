import {configureStore, combineReducers} from '@reduxjs/toolkit';
  import loginslice from "./auth/loginslice";
import themeSlice from "./darkmod/darkslice";
import newsSlice from './newsSlice';
  




const rootreducer=combineReducers({loginslice,themeSlice ,newsSlice}) 


    
const Store =configureStore({reducer:rootreducer});
export default Store

