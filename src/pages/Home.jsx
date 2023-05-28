import { useState, useEffect } from 'react';
import ApiService from '../components/ApiService/ApiService';

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
      <ul>
        Trending today
        {moviesData
          .filter(movie => movie.title !== undefined)
          .map(movie => (
            <li key={movie.id}>
              <p>{movie.title}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Home;
