import styled from 'styled-components';

export const CastContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ActorCard = styled.div`
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
`;

export const ActorName = styled.h3`
  margin-bottom: 5px;
`;

export const ActorImage = styled.img`
  width: 150px;
  height: 225px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const ActorRole = styled.p`
  margin-bottom: 0;
`;
