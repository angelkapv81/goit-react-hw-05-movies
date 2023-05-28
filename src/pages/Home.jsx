import { useState, useEffect } from 'react';
import { useApiService } from 'components/ApiService/ApiService';

const Home = () => {
  const apiService = useApiService();
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.getPopularMovies();
      if (data) {
        setMoviesData(data.movies);
      }
    };

    fetchData();
  }, [apiService]);
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
