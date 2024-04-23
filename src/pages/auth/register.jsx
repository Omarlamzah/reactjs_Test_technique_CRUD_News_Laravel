import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "../../store/auth/loginslice";
 import { useNavigate } from "react-router-dom";
 import { Player } from "@lottiefiles/react-lottie-player";
import singup from "./../../assets/auth/singup.json";
import Loader from "../../component/loading/loading.jsx";
import { motion } from "framer-motion";
import 'toastr/build/toastr.min.css';  
import toastr from  "toastr";

import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"


const Register = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { isDarkMode } = useSelector((state) => state.themeSlice);
  const themeClass = isDarkMode === 'dark' ? 'drmode' : 'ltmode';
  const themeClassauth = isDarkMode === 'dark' ? 'authdark' : 'autligth';

  const { isAuthenticated, user,isLoading } = useSelector((state) => state.loginslice);
  const errorsbackend=  useSelector((state) => state.loginslice.errors);

 
  

  //for client validation
const schema = yup.object().shape({

  "name": yup.string().required("user name is required"),
  "email": yup.string().required("email is required").email("email should be a valid email address"),
  "password": yup.string().required("password is required").matches(/[a-zA-Z]/," Passwords Need At Least 8 Characters includes numbers").min(8)

})
const {handleSubmit, register,formState: {errors } }  =useForm({resolver:yupResolver(schema)})
//for client validation

  const handleRegister = (data) => {
    console.log(data)
      dispatch(registerAsync(data));
  };

  useEffect(() => {
    if(isAuthenticated){      
      toastr.success("welcom back " )
        Navigate("/")
    }
  }, [isAuthenticated]);

  return (
    <div className={` ${themeClass} min-h-screen flex items-center justify-center`}>
      <div className={`${themeClassauth} max-w-md w-full  shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] rounded-md overflow-hidden`}>
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        {isLoading ? (
          <Loader/>
        ) : (
          <motion.section   initial={{ opacity: 0   }} whileInView={{ opacity: 1 }} transition={{duration:1.3}} className=" rounded-3xl lg:flex lg:items-center">
            <div className=" flex justify-center m-auto w-1/3  lg:w-1/2">
              <Player src={singup} loop autoplay className="player" />
            </div>
            <div className= " p-8">
              <form onSubmit={handleSubmit(handleRegister)}>
                <label>
              
                  
                           <div className="form-control">  <input  {...register("name")}   className=" p-2" placeholder="Write user name here"  /><span className="input-border input-border-alt"></span> </div>

                  <span style={{ color: "red" }}>{errorsbackend && errorsbackend.name && errorsbackend.name[0]}
                  {errors?.name?.message}

                  </span>
                </label>
                <br />
                <label>
                
         <div className="form-control">  <input  {...register("email")}   className=" p-2" placeholder="Write email here"  /><span className="input-border input-border-alt"></span> </div>

                  <span style={{ color: "red" }}>{errorsbackend && errorsbackend.email && errorsbackend.email[0]}
                  {errors?.email?.message}
</span>
                </label>
                <br />
                <label>
                 
                 
                           <div className="form-control">  <input  {...register("password")}   className=" p-2" type="password" placeholder="Write password here"  /><span className="input-border input-border-alt"></span> </div>

                  <span style={{ color: "red" }}>{errorsbackend && errorsbackend.password && errorsbackend.password[0]}
                  {errors?.password?.message}
</span>
                </label>
                <br />
                <label>
                 
                 


   <div className="form-control">  <input  {...register("password_confirmation")}  type="password" className=" p-2" placeholder="Write password confirmation here"  /><span className="input-border input-border-alt"></span> </div>

                </label>
                <br />
                <button type="submit"
               className=" float-right m-2 pt-4"
            >register
            </button>
              </form>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default Register;
