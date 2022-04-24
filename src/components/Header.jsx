import React from 'react';
import UserProvider from '../context/UserProvider';
import getLoggedUser from '../services/getLoggedUser';
import appLogo from '../images/appLogo.svg';

export default function Header() {
  const { name } = getLoggedUser();
  return (
    <UserProvider>
      <header>
        <nav>
          <p>
            {name}
          </p>
          <img src={appLogo} alt="App Logo" width="200px" />
        </nav>
      </header>
    </UserProvider>
  );
}
