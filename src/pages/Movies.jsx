// import { useEffect } from 'react';
import { useState } from 'react';
import ApiService from '../components/ApiService/ApiService';

const apiService = new ApiService();

const Movies = () => {
  // useEffect(() => {
  //   // запрос
  // }, []);
  // return <div>тут фільми</div>;
  // };

  const [inputValue, setInputValue] = useState('');
  const [moviesData, setMoviesData] = useState([]);

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // apiService.searchQuery = inputValue;

    try {
      const response = await apiService.getPopularMovies();
      console.log(response.movies);
      setMoviesData(response.movies);
    } catch (error) {
      console.log('Произошла ошибка:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button type="submit">кнопка</button>
      </form>
      {moviesData.map(movie => (
        <ul>
          {moviesData.map(movie => (
            <li key={movie.id}>
              <p>{movie.title}</p>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default Movies;
