import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CastContainer,
  ActorCard,
  ActorName,
  ActorImage,
  ActorRole,
} from './Cast.styled';

import ApiService from '../../apiservice/ApiService';

const apiService = new ApiService();

const defaultImage =
  'https://ternatekota.go.id/images/pimpinan-opd/default.png';

export const Cast = () => {
  const { movieId } = useParams();
  const [castData, setCastData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.getCastForMovieById(movieId);
      if (data && data.cast) {
        setCastData(data.cast);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <CastContainer>
        {castData.map(actor => (
          <ActorCard key={actor.id}>
            <ActorName>{actor.name}</ActorName>
            <ActorImage
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                  : defaultImage
              }
              alt={actor.name}
            />
            <ActorRole>Role: {actor.character}</ActorRole>
          </ActorCard>
        ))}
      </CastContainer>
    </div>
  );
};

export default Cast;
