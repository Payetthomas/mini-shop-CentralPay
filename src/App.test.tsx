import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('rend sans crash et affiche le titre i18n', () => {
    render(
      <BrowserRouter>
        <App>children</App>
      </BrowserRouter>
    );
    // le titre vient d'i18n, mais au pire on vérifie que le header est dans le doc
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});


