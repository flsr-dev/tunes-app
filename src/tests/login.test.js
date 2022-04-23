import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';
import UserProvider from '../context/UserProvider';

describe('Login Page:', () => {
  it('tests if the name input field is in the document', () => {
    renderWithRouter(<UserProvider><Login /></UserProvider>, ['/login']);
    const nameInput = screen.getByLabelText(/user name/i);
    expect(nameInput).toBeInTheDocument();
  });

  it('tests if the login button starts disabled', () => {
    renderWithRouter(<UserProvider><Login /></UserProvider>, ['/login']);
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeDisabled();
  });

  it('tests if the button changes to enabled only when passed a valid username length', () => {
    renderWithRouter(<UserProvider><Login /></UserProvider>, ['/login']);
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
});
