import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CountryCard from '../CountryCard';
import { AuthProvider } from '../../context/AuthContext';

// Mock country data
const mockCountry = {
  flags: { svg: 'https://example.com/flag.svg' },
  name: { common: 'Test Country' },
  capital: ['Test Capital'],
  region: 'Test Region',
  population: 1000000,
  cca3: 'TST'
};

describe('CountryCard', () => {
  test('renders country information correctly', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <CountryCard country={mockCountry} />
        </BrowserRouter>
      </AuthProvider>
    );
    
    // Check country name
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    
    // Check country details
    expect(screen.getByText(/Test Capital/)).toBeInTheDocument();
    expect(screen.getByText(/Test Region/)).toBeInTheDocument();
    expect(screen.getByText(/1,000,000/)).toBeInTheDocument();
    
    // Check image
    const flagImage = screen.getByAltText('Test Country');
    expect(flagImage).toHaveAttribute('src', 'https://example.com/flag.svg');
    
    // Check the link
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/country/TST');
  });
});