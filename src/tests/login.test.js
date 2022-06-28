import { screen, waitFor } from '@testing-library/react';
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

  it(
    'tests if the button changes to enabled only when passed a valid username and password',
    () => {
      renderWithRouter(<UserProvider><Login /></UserProvider>, ['/']);
      const loginButton = screen.getByRole('button', { name: /login/i });
      const nameInput = screen.getByLabelText(/user name/i);
      const passwordInput = screen.getByLabelText(/password/i);

      const invalidUserLength = 'us';
      const validUserLength = 'use';
      const validPassword = '12345678';

      userEvent.type(nameInput, invalidUserLength);
      expect(loginButton).toBeDisabled();

      userEvent.type(nameInput, `{selectall}{del}${validUserLength}`);
      userEvent.type(passwordInput, validPassword);
      expect(loginButton).not.toBeDisabled();

      nameInput.setSelectionRange(0, 2);
      userEvent.type(nameInput, '{del}');
      expect(loginButton).toBeDisabled();
    },
  );

  it('tests if the page is redirected to search after login', async () => {
    const { history } = renderWithRouter(<UserProvider><App /></UserProvider>, ['/']);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const nameInput = screen.getByLabelText(/user name/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const validPassword = '12345678';
    const validUserLength = 'user';

    userEvent.type(nameInput, validUserLength);
    userEvent.type(passwordInput, validPassword);

    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/search');
    });
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
