import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  Container,
  Form,
  Input,
  Button,
  List,
  ListItem,
} from './Movies.styled';

import ApiService from '../../apiservice/ApiService';

const apiService = new ApiService();

export const Movies = () => {
  const [moviesData, setMoviesData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [query, setQuery] = useState(() => searchQuery || '');
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        apiService.searchQuery = query;
        const data = await apiService.SearchMoviesData();
        setMoviesData(data.movies);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchQuery) {
      fetchData();
    }
  }, [query, searchQuery]);

  const handleSearch = () => {
    setSearchParams({ query: query });
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <Container>
      <div>
        <Form onSubmit={e => e.preventDefault()}>
          <Input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search movies..."
          />
          <Button type="button" onClick={handleSearch}>
            Search
          </Button>{' '}
        </Form>
        {moviesData && (
          <List>
            {moviesData
              .filter(movie => movie.title !== undefined)
              .map(movie => (
                <ListItem key={movie.id}>
                  <Link state={{ from: location }} to={`/movies/${movie.id}`}>
                    {movie.title}
                  </Link>
                </ListItem>
              ))}
          </List>
        )}
      </div>
    </Container>
  );
};

export default Movies;
