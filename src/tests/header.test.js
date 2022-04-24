import { screen } from '@testing-library/react';
import React from 'react';
import Header from '../components/Header';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import renderWithRouter from './helpers/renderWithRouter';
import * as getUser from '../services/getLoggedUser';

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
});
