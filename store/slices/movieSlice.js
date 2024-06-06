// store/slices/movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies, searchMovies } from "../../services/api";

export const loadMovies = createAsyncThunk(
  "movies/loadMovies",
  async (page) => {
    const movies = await fetchMovies(page);
    return movies;
  },
);

export const searchForMovies = createAsyncThunk(
  "movies/searchForMovies",
  async ({ query, page }) => {
    const movies = await searchMovies(query, page);
    return movies;
  },
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    loading: false,
    error: null,
    searchQuery: "",
    currentPage: 1,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...state.list, ...action.payload];
      })
      .addCase(loadMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchForMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchForMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(searchForMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, incrementPage } = movieSlice.actions;
export default movieSlice.reducer;
