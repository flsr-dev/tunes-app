import { screen } from '@testing-library/react';
import React from 'react';
import Header from '../components/Header';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderWithRouter';

const USER_KEY = 'user';
const NEW_USER = {
  name: 'user',
  email: '',
  image: '',
  description: '',
};

describe('Header component:', () => {
  beforeEach(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(NEW_USER));
  });

  it('tests if the header contains the app logo', () => {
    renderWithRouter(<Header />, ['/search']);
    const appLogo = screen.getByRole('img', { name: /app logo/i });
    expect(appLogo).toHaveAttribute('src', 'appLogo.svg');
  });

  it('tests if the header is present in the search page', () => {
    const { name } = NEW_USER;
    renderWithRouter(<Search />, ['/search']);
    const userNameElement = screen.getByText(name);
    expect(userNameElement).toBeInTheDocument();
  });

  it('tests if the header is present in the album page', () => {
    const { name } = NEW_USER;
    renderWithRouter(<Album />, ['/album/336643808']);
    const userNameElement = screen.getByText(name);
    expect(userNameElement).toBeInTheDocument();
  });

  it('tests if the header is present in the favorites page', () => {
    const { name } = NEW_USER;
    renderWithRouter(<Favorites />, ['/favorites']);
    const userNameElement = screen.getByText(name);
    expect(userNameElement).toBeInTheDocument();
  });

  it('tests if the header is present in the profile page', () => {
    const { name } = NEW_USER;
    renderWithRouter(<Profile />, ['/profile']);
    const userNameElement = screen.getByText(name);
    expect(userNameElement).toBeInTheDocument();
  });
});
