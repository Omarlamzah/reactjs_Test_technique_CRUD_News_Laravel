// quizCrudSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import { createNewApi } from "../api/news/createnews";
import { getNewsApi } from "../api/news/getnews";
import { updateNewsApi } from "../api/news/updatenews";
import { deleteNewsApi } from "../api/news/deleteNews";
import { findcategoriesApi } from "../api/news/findcategoriesApi";






// Async Thunk for fetching quizzes
export const fetchNews = createAsyncThunk('NewsSlice/getNews', async () => {
  try {
    const response = await getNewsApi(); // Replace with your Laravel API endpoint
    return response.data.news;
  } catch (error) {
    throw error.response.data;
  }
});

// Async Thunk for creating a quiz
export const createNew = createAsyncThunk('NewsSlice/createNew', async (news) => {
  try {
    const response = await createNewApi(news); // Replace with your Laravel API endpoint
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async Thunk for updating a quiz
export const updateNews = createAsyncThunk('NewsSlice/updateNews', async (data ) => {
  try {
 
          const response = await updateNewsApi(data);
         return response;

   } catch (error) {
    throw error.response.data;
  }
});

// Async Thunk for deleting a quiz
export const deleteNews = createAsyncThunk('NewsSlice/deleteNews', async (newsId) => {
  try {
     const response = await deleteNewsApi(newsId)  ; 
     return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


// Async Thunk for deleting a quiz
export const findcategories = createAsyncThunk('NewsSlice/findcategories', async (name) => {
    try {
       const response = await findcategoriesApi(name)  ; // Replace with your Laravel API endpoint
       return response.data;
    } catch (error) {
      throw error.response.data;
    }
  });

 
  const NewsSlice = createSlice({
    name: 'quizCrud',
    initialState: {
      news: [],
      loading: false,
      error: null,
      msg: "",
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // fetchNews
        .addCase(fetchNews.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchNews.fulfilled, (state, action) => {
          state.news = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchNews.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  
        // createNew
        .addCase(createNew.pending, (state) => {
          state.loading = true;
         })
        .addCase(createNew.fulfilled, (state, action) => {
           
          state.msg = action.payload.message;
          state.loading = false;
          state.error = null;
          state.news.unshift(action.payload.news);
          console.log(action.payload)
        })
        .addCase(createNew.rejected, (state, action) => {
            console.log(action)

          state.loading = false;
          state.error = action.error.message;
        })
  
        // updateNews
        .addCase(updateNews.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateNews.fulfilled, (state, action) => {
            console.log(action.payload)

          state.msg = action.payload.message;
          state.loading = false;
          state.error = null;
          // If you're updating existing news, update it in the news array
          const updatedIndex = state.news.findIndex(item => item.id === action.payload.news.id);
          if (updatedIndex !== -1) {
            state.news[updatedIndex] = action.payload.news;
          }
        })
        .addCase(updateNews.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
  
        // deleteNews
        .addCase(deleteNews.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteNews.fulfilled, (state, action) => {
          state.msg = action.payload.message;
          state.loading = false;
          state.error = null;
          // Remove the deleted news item from the news array
          state.news = state.news.filter(item => item.id !== action.meta.arg);
        })
        .addCase(deleteNews.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        
        
        
         // findcategories
         .addCase(findcategories.pending, (state) => {
            state.loading = true;
          })
          .addCase(findcategories.fulfilled, (state, action) => {
            state.msg = "fetching successfully";
            state.loading = false;
            state.news=action.payload.articles
            state.error = null;
           })
          .addCase(findcategories.rejected, (state, action) => {
            state.loading = false;

            state.error = "error feching category try again";
          })
          
        
        
        ;
    },
  });
  
  export default NewsSlice.reducer;