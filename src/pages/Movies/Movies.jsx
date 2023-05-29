import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [inputValue, setInputValue] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [searched, setSearched] = useState(false); // Added searched state

  const handleSearch = async () => {
    if (inputValue === '') {
      return;
    }

    apiService.searchQuery = inputValue;
    const data = await apiService.SearchMoviesData();
    if (data) {
      setMoviesData(data.movies);
      setSearched(true); // Set searched to true when performing the search
    }
  };

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  return (
    <Container>
      <div>
        <Form onSubmit={e => e.preventDefault()}>
          <Input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Search movies..."
          />
          <Button type="button" onClick={handleSearch}>
            Search
          </Button>{' '}
        </Form>
        {searched && (
          <List>
            {moviesData
              .filter(movie => movie.title !== undefined)
              .map(movie => (
                <ListItem key={movie.id}>
                  <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </ListItem>
              ))}
          </List>
        )}
      </div>
    </Container>
  );
};

export default Movies;
