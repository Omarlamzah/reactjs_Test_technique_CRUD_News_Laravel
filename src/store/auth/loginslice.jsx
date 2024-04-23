import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {setcookie,removeCookie} from '../../utlis/cookies.js';
 import { getuserApi } from "../../api/getuserApi.js";
import { loginApi } from "../../api/loginapi.js";
import { registerApi } from "../../api/registerapi.js";
import { logoutApiCall } from "../../api/logout.js";
 import 'toastr/build/toastr.min.css';  
import toastr from  "toastr";
 const initialState = {
  user: null,
  errors: null,
  isLoading: true,
  isAuthenticated: false,
  msg :""
};

export const getUser = createAsyncThunk('auth/checkAuth', async () => {
   try {
  //getuserapi
      const response= await getuserApi()
      return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const loginAsync = createAsyncThunk('auth/login', async (credentials) => {
  try {
    // loginapi
    const response = await loginApi(credentials)
    return response.data;
  } catch (error) {
    return error;
  }
});

export const registerAsync = createAsyncThunk('auth/register', async (userData) => {
  try {
    const response = await registerApi(userData);
    return response.data;
  } catch (error) {
        return error;

  }
});


export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  try {
    await logoutApiCall();
  } catch (error) {
    return error;
  }
});


 
 
const loginslice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateauthntiaction: (state) => {
      state.isAuthenticated = false;
    },
    updateauthntiactiontotrue: (state) => {
      state.isAuthenticated = true;
    },
    updateauthntiactiontofalse: (state) => {
      state.isAuthenticated = false;
    },

    updateuserlogin:(state,payload)=>{
      //state.user=user
     }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated=true
       
          
            })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })

      //loginAsync
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated=true
        setcookie("token", action.payload.token)

        
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload; // Access the nested message property

 
      })
      .addCase(registerAsync.pending, (state) => {
 
        state.isLoading = true;
      })

      // registerAsync
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated=true
        setcookie("token", action.payload.token)

      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload; // Access the nested message property
       })
       
       
       
       
       
       
       .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        removeCookie("token"),
        removeCookie("isAuthenticated")
 
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload; // Access the nested message property
      })
      
      
       
       
       
       
  },
});

 export const {updateauthntiactiontofalse,updateauthntiactiontotrue ,updateuserlogin} = loginslice.actions
export default loginslice.reducer;
