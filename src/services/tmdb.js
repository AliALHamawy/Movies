import axios from 'axios';

const API_KEY = 'db5612f4e61785b90cbf4bde69903536'; // Replace with your actual key
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'en-US', // For Arabic results, change to 'en-US' for English and 'ar-SA' for arabic
    }
});

export default tmdb;

// Common API calls you'll need
export const getPopularMovies = (page = 1) =>
    tmdb.get('/movie/popular', { params: { page } });

export const getTopRatedMovies = (page = 1) =>
    tmdb.get('/movie/top_rated', { params: { page } });

export const searchMovies = (query, page = 1) =>
    tmdb.get('/search/movie', { params: { query, page } });

export const getMovieDetails = (movieId) =>
    tmdb.get(`/movie/${movieId}`);

export const getMovieTrailers = (movieId) =>
    tmdb.get(`/movie/${movieId}/videos`);