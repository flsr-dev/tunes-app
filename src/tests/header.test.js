import { screen } from '@testing-library/react';
import React from 'react';
import Search from '../pages/Search';
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

  it('tests if the header is present in the search page', () => {
    const { name } = NEW_USER;
    renderWithRouter(<Search />, ['/search']);
    const userNameElement = screen.getByText(name);
    expect(userNameElement).toBeInTheDocument();
  });
});
