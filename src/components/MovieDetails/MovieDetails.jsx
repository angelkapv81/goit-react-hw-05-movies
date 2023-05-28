import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import ApiService from 'components/ApiService/ApiService';
// const apiService = ApiService();
import { useApiService } from 'components/ApiService/ApiService';
export const MovieDetails = () => {
  // const params = useParams;
  const apiService = useApiService();
  const { movieId } = useParams(); // Получение параметра из URL

  const [movieData, setMovieData] = useState(null);

  //   useEffect(() => {
  //     const fetchMovieData = async () => {
  //       //   try {
  //       const response = await apiService.getMovieById();
  //       const data = response.data;
  //       setMovieData(data);
  //       //   }
  //       //   catch (error) {
  //       //     console.log('Произошла ошибка:', error);
  //       //   }
  //     };

  //     fetchMovieData();
  //   }, [movieId]);

  if (!movieData) {
    return <p>Loading...</p>;
  }

  const { title, imageUrl } = movieData;

  //   console.log(params);
  const backLinkHref = '/movies';
  return (
    <>
      <Link to={backLinkHref}>Go Back</Link>;<p>інфа про фільми</p>
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};
export default MovieDetails;
