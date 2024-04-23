import { createSlice } from '@reduxjs/toolkit';
import { removeCookie, setcookie } from '../../utlis/cookies';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: 'light',
    loading: false,
    error: null,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = state.isDarkMode === 'dark' ? 'light' : 'dark';
      state.isDarkMode === 'dark' ? setcookie('isDarkMode', 'dark') : removeCookie('isDarkMode');
 
   
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
