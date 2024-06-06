// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
