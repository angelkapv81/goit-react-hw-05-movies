import axios from 'axios';
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

const API_KEY = '361de5f2df15d161ebabd80084655895';

const BASE_URL = 'https://api.themoviedb.org/3';
export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  async SearchMoviesData() {
    const config = {
      method: 'get',
      url: `${BASE_URL}/search/movie`,
      responseType: 'json',
      params: {
        api_key: API_KEY,
        query: this.searchQuery,
        page: this.page,
      },
    };

    try {
      const response = await axios(config);

      const movies = [];
      for (const obj of response.data.results) {
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
        obj.total_pages = response.data.total_pages;
        const poster_url = poster_path
          ? `https://image.tmdb.org/t/p/original/${poster_path}`
          : 'http://surl.li/glnug';

        const genres_names = getGenresByIds(genres, genre_ids);
        const new_obj = {
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
        movies.push(new_obj);
      }
      const data = {
        page: response.data.page,
        movies,
      };
      return data;
    } catch {
      console.log('Sonething wrong');
      return;
    }
  }

  async getPopularMovies() {
    const config = {
      method: 'get',
      url: `${BASE_URL}/trending/all/day`,
      responseType: 'json',
      params: {
        api_key: API_KEY,
        page: this.page,
      },
    };

    const movies = [];

    try {
      const response = await axios(config);
      for (const obj of response.data.results) {
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
        obj.total_pages = response.data.total_pages;
        const poster_url = `https://image.tmdb.org/t/p/original/${poster_path}`;
        const genres_names = getGenresByIds(genres, genre_ids);

        const new_obj = {
          id,
          genres_names,
          title,
          poster_url,
          // release_year,
          backdrop_path,
          overview,
          popularity,
          original_title,
          vote_average,
          vote_count,
        };
        movies.push(new_obj);
      }
      const data = {
        page: response.page,
        movies,
      };
      return data;
    } catch {
      console.log('Sonething wrong');
      return;
    }
  }

  async getMovieById(id) {
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
    } catch {
      return;
    }
  }
}

// Функція для перетворення масиву ids жанрів в масив імен жанрів
function getGenresByIds(genres, ids) {
  return genres
    .filter(genre => ids.includes(genre.id))
    .map(genre => genre.name);
}
