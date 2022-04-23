import { screen } from '@testing-library/react';
import React from 'react';
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
});
