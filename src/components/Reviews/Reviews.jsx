import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { useParams } from 'react-router-dom';
import {
  MovieOverviewContainer,
  MovieOverviewTitle,
  NoReviewsMessage,
  Content,
} from './Reviews.styled';
import ApiService from '../../apiservice/ApiService';

const apiService = new ApiService();

const formatDate = dateString => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await apiService.getMovieReviews(movieId);
      if (data && data.results) {
        setReviews(data.results);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <MovieOverviewContainer>
      <MovieOverviewTitle>Movie Reviews</MovieOverviewTitle>
      {reviews.length === 0 ? (
        <NoReviewsMessage>
          You don't have any reviews on the film
        </NoReviewsMessage>
      ) : (
        reviews.map(review => (
          <div key={review.id}>
            <p>
              <b>Author: </b>
              {review.author}
            </p>
            <Content>
              <ReactMarkdown>{review.content}</ReactMarkdown>
            </Content>
            <p>
              <b>Rating: </b>
              {review.author_details.rating}
            </p>
            <p>
              <b>Created At: </b>
              {formatDate(review.created_at)}
            </p>
            <a href={review.url}>Read Full Review</a>
            <hr />
          </div>
        ))
      )}
    </MovieOverviewContainer>
  );
};

export default Reviews;
