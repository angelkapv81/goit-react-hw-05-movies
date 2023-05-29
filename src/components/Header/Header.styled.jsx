import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.nav`
  background-color: #f8f9fa;
  padding: 1rem;
`;

export const StyledNavLink = styled(NavLink)`
  margin-right: 1rem;
  color: #212529;
  text-decoration: none;
  font-weight: bold;

  &.active {
    color: red;
  }
`;
