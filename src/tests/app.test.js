import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Test <App/> routes', () => {
  it('tests if the login page is rendered', () => {
    renderWithRouter(<App />);
    const loginButton = screen.getAllByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
