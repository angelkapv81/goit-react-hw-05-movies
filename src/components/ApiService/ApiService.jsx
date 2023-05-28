import { useState, useEffect } from 'react';
import axios from 'axios';
const API_KEY = '361de5f2df15d161ebabd80084655895';
const BASE_URL = 'https://api.themoviedb.org/3';
const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];
export const useApiService = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const searchMoviesData = async () => {
    // Ваш код
    const config = {
      method: 'get',
      url: `${BASE_URL}/search/movie`,
      responseType: 'json',
      params: {
        api_key: API_KEY,
        query: searchQuery,
        page: page,
      },
    };
    try {
      const response = await axios(config);
      const movies = response.data.results.map(obj => {
        const {
          id,
          genre_ids,
          title,
          poster_path,
          backdrop_path,
          overview,
          popularity,
          original_title,
          vote_average,
          vote_count,
        } = obj;
        const poster_url = poster_path
          ? `https://image.tmdb.org/t/p/original/${poster_path}`
          : 'http://surl.li/glnug';
        const genres_names = getGenresByIds(genres, genre_ids);
        return {
          id,
          genres_names,
          title,
          poster_url,
          backdrop_path,
          overview,
          popularity,
          original_title,
          vote_average,
          vote_count,
        };
      });
      const data = {
        page: response.data.page,
        movies,
      };
      return data;
    } catch (error) {
      console.log('Something went wrong:', error);
      return null;
    }
  };

  const getPopularMovies = async () => {
    const config = {
      method: 'get',
      url: `${BASE_URL}/trending/all/day`,
      responseType: 'json',
      params: {
        api_key: API_KEY,
        page: page,
      },
    };

    try {
      const response = await axios(config);
      const movies = response.data.results.map(obj => {
        const {
          id,
          genre_ids,
          title,
          poster_path,
          backdrop_path,
          overview,
          popularity,
          original_title,
          vote_average,
          vote_count,
        } = obj;

        const poster_url = `https://image.tmdb.org/t/p/original/${poster_path}`;
        const genres_names = getGenresByIds(genres, genre_ids);

        return {
          id,
          genres_names,
          title,
          poster_url,
          backdrop_path,
          overview,
          popularity,
          original_title,
          vote_average,
          vote_count,
        };
      });

      const data = {
        page: response.data.page,
        movies,
      };

      return data;
    } catch (error) {
      console.log('Something went wrong:', error);
      return null;
    }
  };

  const getMovieById = async id => {
    const config = {
      method: 'get',
      url: `${BASE_URL}/movie/${id}`,
      responseType: 'json',
      params: {
        api_key: API_KEY,
      },
    };

    try {
      const response = await axios(config);
      const data = response.data;
      const genres_names = data.genres.map(e => e.name).join(', ');
      const poster_url = data.poster_path
        ? `https://image.tmdb.org/t/p/original/${data.poster_path}`
        : 'http://surl.li/glnug';

      const newData = {
        id,
        title: data.title,
        original_title: data.original_title,
        overview: data.overview,
        poster_url,
        vote_average: data.vote_average.toFixed(1),
        vote_count: data.vote_count,
        popularity: data.popularity,
        genres_names,
      };

      return newData;
    } catch (error) {
      console.log('Something went wrong:', error);
      return null;
    }
  };

  const getGenresByIds = (genres, ids) => {
    return genres
      .filter(genre => ids.includes(genre.id))
      .map(genre => genre.name);
  };

  return {
    searchMoviesData,
    getPopularMovies,
    getMovieById,
  };
};
export default useApiService;
