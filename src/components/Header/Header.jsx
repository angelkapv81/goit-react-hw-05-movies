import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
      ;
    </>
  );
};
export default Header;

//  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
//    <div class="navbar-nav">
//      <a class="nav-link active" aria-current="page" href="#">
//        Home
//      </a>
//      <a class="nav-link" href="#">
//        Features
//      </a>
//      <a class="nav-link" href="#">
//        Pricing
//      </a>
//      <a class="nav-link disabled">Disabled</a>
//    </div>
//  </div>;
