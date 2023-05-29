import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const BackLink = styled(Link)`
  color: #333;
  text-decoration: none;
  margin-bottom: 10px;
  display: inline-block;
`;

export const MovieInfo = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const MoviePoster = styled.img`
  width: 200px;
  height: auto;
  margin-right: 20px;
`;

export const MovieDetailsContent = styled.div`
  flex-grow: 1;
`;

export const MovieTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const UserScore = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const Genres = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const Overview = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

export const OverviewTitle = styled.h3`
  margin-bottom: 10px;
`;

export const OverviewText = styled.p`
  margin-bottom: 0;
`;

export const NavigationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
`;

export const NavigationItem = styled.li`
  display: inline-block;
  margin-right: 10px;
`;

export const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
