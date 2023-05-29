import React from 'react';

import { Container, StyledNavLink } from './Header.styled';

const Header = () => {
  return (
    <Container>
      <StyledNavLink exact="true" to="/">
        Home
      </StyledNavLink>

      <StyledNavLink to="/movies">Movies</StyledNavLink>
    </Container>
  );
};

export default Header;
