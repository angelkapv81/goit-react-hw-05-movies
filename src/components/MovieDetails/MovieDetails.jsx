import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
// const apiService = new ApiService();
export const MovieDetails = () => {
  const params = useParams;
  console.log(params);
  const backLinkHref = '/movies';
  return (
    <>
      <Link to={backLinkHref}>Go Back</Link>;<p>інфа про фільми</p>
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
