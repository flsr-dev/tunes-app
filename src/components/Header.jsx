import React from 'react';
import { Link } from 'react-router-dom';
import UserProvider from '../context/UserProvider';
import getLoggedUser from '../services/getLoggedUser';
import appLogo from '../images/appLogo.svg';

export default function Header() {
  const { name } = getLoggedUser();
  return (
    <UserProvider>
      <header>
        <Link to="/">
          <img src={appLogo} alt="App Logo" width="200px" />
        </Link>
        <nav>
          <ul>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
        <p>
          {name}
        </p>
      </header>
    </UserProvider>
  );
}
