import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import renderWithRouter from './helpers/renderWithRouter';
import * as getUser from '../services/getLoggedUser';
import UserProvider from '../context/UserProvider';

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
    jest.restoreAllMocks();
  });

  it('tests if the header contains the app logo', () => {
    const mockedGetUser = jest.spyOn(getUser, 'default');
    renderWithRouter(<Header />, ['/search']);
    const appLogo = screen.getByRole('img', { name: /app logo/i });
    expect(mockedGetUser).toBeCalled();
    expect(appLogo).toHaveAttribute('src', 'appLogo.svg');
  });

  it('tests if the header is present in the search page', () => {
    const { name } = NEW_USER;
    const mockedGetUser = jest.spyOn(getUser, 'default');
    renderWithRouter(<Search />, ['/search']);
    const userNameElement = screen.getByText(name);
    expect(mockedGetUser).toBeCalled();
    expect(userNameElement).toBeInTheDocument();
  });

  it('tests if the header is present in the album page', () => {
    const { name } = NEW_USER;
    const mockedGetUser = jest.spyOn(getUser, 'default');
    renderWithRouter(<Album />, ['/album/336643808']);
    const userNameElement = screen.getByText(name);
    expect(mockedGetUser).toBeCalled();
    expect(userNameElement).toBeInTheDocument();
  });

  it('tests if the header is present in the favorites page', () => {
    const { name } = NEW_USER;
    const mockedGetUser = jest.spyOn(getUser, 'default');
    renderWithRouter(<Favorites />, ['/favorites']);
    const userNameElement = screen.getByText(name);
    expect(mockedGetUser).toBeCalled();
    expect(userNameElement).toBeInTheDocument();
  });

  it('tests if the header is present in the profile page', () => {
    const { name } = NEW_USER;
    const mockedGetUser = jest.spyOn(getUser, 'default');
    renderWithRouter(<Profile />, ['/profile']);
    const userNameElement = screen.getByText(name);
    expect(mockedGetUser).toBeCalled();
    expect(userNameElement).toBeInTheDocument();
  });

  it('tests if the header is present in the profile edit page', () => {
    const { name } = NEW_USER;
    const mockedGetUser = jest.spyOn(getUser, 'default');
    renderWithRouter(<ProfileEdit />, ['/profile/edit']);
    const userNameElement = screen.getByText(name);
    expect(mockedGetUser).toBeCalled();
    expect(userNameElement).toBeInTheDocument();
  });

  it('tests if the navigation link redirects to search page', async () => {
    const { history } = renderWithRouter(<UserProvider><Profile /></UserProvider>, ['/profile']);
    const searchLink = screen.getByRole('link', { name: /search/i });
    expect(searchLink).toBeInTheDocument();
    userEvent.click(searchLink);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/search');
    });
  });

  it('tests if the navigation link redirects to profile page', async () => {
    const { history } = renderWithRouter(<UserProvider><Search /></UserProvider>, ['/profile']);
    const profileLink = screen.getByRole('link', { name: /profile/i });
    expect(profileLink).toBeInTheDocument();
    userEvent.click(profileLink);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/profile');
    });
  });

  it('tests if the navigation link redirects to favorites page', async () => {
    const { history } = renderWithRouter(<UserProvider><Search /></UserProvider>, ['/profile']);
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/favorites');
    });
  });
});
