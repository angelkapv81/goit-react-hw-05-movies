import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../../apiservice/ApiService';

const apiService = new ApiService();

const Home = () => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.getPopularMovies();
      if (data) {
        setMoviesData(data.movies);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {moviesData
          .filter(movie => movie.title !== undefined)
          .map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
