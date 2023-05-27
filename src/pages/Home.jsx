import { useState, useEffect } from 'react';
import ApiService from '../components/ApiService/ApiService';

const apiService = new ApiService();

const Home = () => {
  const [moviesData, setMoviesData] = useState([]);
  useEffect(() => {
    // Здесь можно выполнить запрос и получить данные
    apiService.getPopularMovies().then(console.log);
  }, []);
  return (
    <div>
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
export default Home;
