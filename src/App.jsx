import './App.css';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbarguest from './component/navbarguest';
import NavbarAth from './component/navbarauth';
import { getUser } from './store/auth/loginslice';
import Notfound from './pages/404/notfound';
 import Home from "./pages/home"
 
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
   const { user ,isAuthenticated,isLoading,errors} = useSelector((state) => state.loginslice);
 
 
    useEffect(() => {
      dispatch(getUser());
     }, [dispatch]);
  

 
  return (
    <>
   
   {isAuthenticated    ? <NavbarAth /> : <Navbarguest />}
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={   <Home/>} />
        <Route path="/login"      element={  <Login /> }  />
         <Route path="/register"   element={ <Register /> } />
          <Route path="*" element={<Notfound />} /> 

          

      </Routes>
    </>
  );
}

export default App;
