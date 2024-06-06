// services/api.js
import axios from "axios";

const API_KEY = "YOUR_TMDB_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchMovies = async (page = 1) => {
  try {
    const response = await api.get("/movie/popular", { params: { page } });
    return response.data.results;
  } catch (error) {
    throw new Error("Error fetching movies");
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get("/search/movie", {
      params: { query, page },
    });
    return response.data.results;
  } catch (error) {
    throw new Error("Error searching movies");
  }
};
