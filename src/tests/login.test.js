import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';
import UserProvider from '../context/UserProvider';
import App from '../App';

describe('Login Page:', () => {
  it('tests if the name input field is in the document', () => {
    renderWithRouter(<UserProvider><Login /></UserProvider>, ['/']);
    const nameInput = screen.getByLabelText(/user name/i);
    expect(nameInput).toBeInTheDocument();
  });

  it('tests if the login button starts disabled', () => {
    renderWithRouter(<UserProvider><Login /></UserProvider>, ['/']);
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeDisabled();
  });

  it('tests if the button changes to enabled only when passed a valid username length', () => {
    renderWithRouter(<UserProvider><Login /></UserProvider>, ['/']);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const nameInput = screen.getByLabelText(/user name/i);
    const invalidUserLength = 'us';
    const validUserLength = 'use';

    userEvent.type(nameInput, invalidUserLength);
    expect(loginButton).toBeDisabled();

    userEvent.type(nameInput, `{selectall}{del}${validUserLength}`);
    expect(loginButton).not.toBeDisabled();

    nameInput.setSelectionRange(0, 2);
    userEvent.type(nameInput, '{del}');
    expect(loginButton).toBeDisabled();
  });

  it('tests if the page is redirected to search after login', async () => {
    renderWithRouter(<UserProvider><App /></UserProvider>, ['/']);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const nameInput = screen.getByLabelText(/user name/i);
    const validUserLength = 'user';

    userEvent.type(nameInput, validUserLength);
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    const searchPage = await screen.findByText(/search/i);
    expect(searchPage).toBeInTheDocument();
  });

  it('tests if the user info is saved on localstorage', () => {
    renderWithRouter(<UserProvider><App /></UserProvider>, ['/']);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const nameInput = screen.getByLabelText(/user name/i);
    const validUserLength = 'user';
    const USER_KEY = 'user';
    const newUser = {
      name: 'user',
      email: '',
      image: '',
      description: '',
    };

    userEvent.type(nameInput, validUserLength);
    userEvent.click(loginButton);
    const storedUserInfo = JSON.parse(localStorage.getItem(USER_KEY));
    expect(storedUserInfo).toEqual(newUser);
  });
});
