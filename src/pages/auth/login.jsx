import { AiOutlineLoading3Quarters } from "react-icons/ai"; 
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  loginAsync } from "./../../store/auth/loginslice";
 import { useNavigate } from "react-router-dom";
 import { Player } from "@lottiefiles/react-lottie-player";
import loginjson from "./../../assets/auth/login.json";
import Loader from "../../component/loading/loading.jsx";
 import { motion } from "framer-motion";

import 'toastr/build/toastr.min.css';  
import toastr from  "toastr";

import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"


const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
 
  const { isDarkMode } = useSelector((state) => state.themeSlice);
  const themeClass = isDarkMode === 'dark' ? 'drmode' : 'ltmode';
  const themeClassauth = isDarkMode === 'dark' ? 'authdark' : 'autligth';
  const { isAuthenticated,user, isLoading ,msg} = useSelector((state) => state.loginslice);
  const errorsbackend=  useSelector((state) => state.loginslice.errors);
 
 
 
//for client validation
const schema = yup.object().shape({

 
  "email": yup.string().required("email is required").email("email should be a valid email address"),
  "password": yup.string().required("password is required").matches(/[a-zA-Z]/," Passwords Need At Least 8 Characters includes numbers").min(8)

})
const {handleSubmit, register,formState: {errors } }  = useForm({resolver:yupResolver(schema)})
//for client validation

const handleLogin = (data) => {
  dispatch(loginAsync(data));
 

};


useEffect(() => {
  if(isAuthenticated){
    toastr.success("welcom back " )
    Navigate("/")
  }
}, [isAuthenticated]);




 
 

  return (
    <div className={` ${themeClass} rounded-3xl min-h-screen flex items-center justify-center `}>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.3 }} className={`${themeClassauth}  max-w-md w-full bg-white  rounded-md overflow-hidden lg:flex lg:flex-row  lg:rounded-none   shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] `}>
          <div className= {`  m-auto w-1/2 lg:flex-col`} >
            <Player src={loginjson} loop autoplay className="player" />
          </div>
          <form onSubmit={handleSubmit(handleLogin)} className= {`  p-8`} >
         
                         <div className="form-control">  <input    {...register("email")}  className=" p-2" placeholder="Write email here" required="" /><span className="input-border input-border-alt"></span> </div>

            <span className="text-red-500">
              {errorsbackend && errorsbackend.email && errorsbackend.email[0]}
              {errors?.email?.message}

            </span>
            <br />

            <div>
            <div className="form-control">  <input  {...register("password")} type="password" className=" p-2" placeholder="password"  /><span className="input-border input-border-alt"></span> </div>

        </div>

          
            <span className="text-red-500">
              {errorsbackend && errorsbackend.password && errorsbackend.password[0]}
              {errors?.password?.message}
            </span>
            <button type="submit" className="  float-right m-2 pt-4"  >
                login
              </button>
 
          </form>

        </motion.section>
      )}


 

    </div>
  );
};

export default Login;