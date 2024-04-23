import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css'


import Store from './store/store.jsx'; 
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
 
  <Provider store={Store}>
         <BrowserRouter>
            <App />
          </BrowserRouter>
        
   
 </Provider>
        
)




 
 