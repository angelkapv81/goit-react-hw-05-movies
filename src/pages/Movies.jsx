import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApiService } from 'components/ApiService/ApiService';

export const Movies = () => {
  const [inputValue, setInputValue] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const apiService = useApiService();

  useEffect(() => {
    if (inputValue === '') {
      return;
    }

    const fetchData = async () => {
      apiService.searchQuery = inputValue;
      const data = await apiService.searchMoviesData();
      if (data) {
        setMoviesData(data.movies);
      }
    };

    fetchData();
  }, [inputValue, apiService]);

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      apiService.searchQuery = inputValue;
      const data = await apiService.searchMoviesData();
      if (data) {
        setMoviesData(data.movies);
      }
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {moviesData
        .filter(movie => movie.title !== undefined)
        .map(movie => {
          return (
            <Link key={movie.id} to={`${movie.id}`}>
              {movie.title}
            </Link>
          );
        })}
    </div>
  );
};
export default Movies;
