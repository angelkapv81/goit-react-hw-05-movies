import React, { useState, useEffect } from 'react';
import ApiService from '../components/ApiService/ApiService';
import { Link } from 'react-router-dom';

const apiService = new ApiService();

export const Movies = () => {
  const [inputValue, setInputValue] = useState('');
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    if (inputValue === '') {
      return;
    }
    // console.log('пошук', inputValue);
    const fetchData = async () => {
      apiService.searchQuery = inputValue;
      const data = await apiService.SearchMoviesData();
      if (data) {
        setMoviesData(data.movies);
      }
    };

    fetchData();
  }, [inputValue]);

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await apiService.SearchMoviesData();
      setMoviesData(response.movies);
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        {/* <button type="submit">OK</button> */}
      </form>
      {/* <ul> */}
      {moviesData
        .filter(movie => movie.title !== undefined)
        .map(movie => {
          return (
            // <li>
            <Link key={movie.id} to={`${movie.id}`}>
              {movie.title}
            </Link>
            // </li>
          );
        })}
      {/* </ul> */}
    </div>
  );
};

export default Movies;
