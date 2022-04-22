import { screen } from '@testing-library/react';
import React from 'react';
import Login from '../pages/Login';
import renderWithRouter from './helpers/renderWithRouter';

describe('Login Page:', () => {
  it('tests if the name input field is in the document', () => {
    renderWithRouter(<Login />, ['/login']);
    const nameInput = screen.getByLabelText(/user name/i);
    expect(nameInput).toBeInTheDocument();
  });
});
