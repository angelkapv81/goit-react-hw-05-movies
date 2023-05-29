import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import ApiService from '../../apiservice/ApiService';

import {
  Container,
  BackLink,
  MovieInfo,
  MoviePoster,
  MovieDetailsContent,
  MovieTitle,
  UserScore,
  Genres,
  Overview,
  OverviewTitle,
  OverviewText,
  NavigationList,
  NavigationItem,
  StyledLink,
} from './MovieDetails.styled';

const apiService = new ApiService();

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.getMovieById(movieId);
      if (data) {
        setMovieData(data);
      }
    };

    fetchData();
  }, [movieId]);

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <Container>
      <BackLink to={backLinkHref}>&#9754;Go back</BackLink>
      <MovieInfo>
        <MoviePoster src={movieData.poster_url} alt={movieData.title} />
        <MovieDetailsContent>
          <MovieTitle>{movieData.title}</MovieTitle>
          <UserScore>
            <b>User Score:</b> {movieData.popularity}
          </UserScore>
          <Genres>
            <b>Genres:</b> {movieData.genres_names}
          </Genres>
          <Overview>
            <OverviewTitle>Overview</OverviewTitle>
            <OverviewText>{movieData.overview}</OverviewText>
          </Overview>
        </MovieDetailsContent>
      </MovieInfo>
      <NavigationList>
        <NavigationItem>
          <StyledLink to="cast" state={{ from: backLinkHref }}>
            Cast
          </StyledLink>
        </NavigationItem>
        <NavigationItem>
          <StyledLink to="reviews" state={{ from: backLinkHref }}>
            Reviews
          </StyledLink>
        </NavigationItem>
      </NavigationList>
      <Outlet />
    </Container>
  );
};

export default MovieDetails;
