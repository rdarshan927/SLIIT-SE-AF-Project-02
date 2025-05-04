import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import Favorites from '../Favorites';
import * as apiService from '../../services/api';
import { jest } from '@jest/globals'; // Add this import

// Mock API service
//jest.mock('../../services/api');
jest.unstable_mockModule('../../services/api', () => ({
  fetchCountries: jest.fn(),
}));

// Custom wrapper to provide a logged-in user
const renderWithUser = (ui, { favorites = [] } = {}) => {
  // Create a wrapper with a logged-in user
  const Wrapper = ({ children }) => {
    const { login, toggleFavorite } = useAuth();
    
    React.useEffect(() => {
      // Log in
      login('test@example.com', 'password123');
      
      // Add favorites
      favorites.forEach(code => {
        toggleFavorite(code);
      });
    }, []);
    
    return children;
  };
  
  return render(
    <AuthProvider>
      <BrowserRouter>
        <Wrapper>{ui}</Wrapper>
      </BrowserRouter>
    </AuthProvider>
  );
};

// Mock country data
const mockCountries = {
  USA: {
    name: { common: 'United States' },
    flags: { svg: 'https://example.com/us-flag.svg' },
    capital: ['Washington, D.C.'],
    region: 'Americas',
    population: 331000000,
    cca3: 'USA'
  },
  FRA: {
    name: { common: 'France' },
    flags: { svg: 'https://example.com/france-flag.svg' },
    capital: ['Paris'],
    region: 'Europe',
    population: 67000000,
    cca3: 'FRA'
  }
};

describe('Favorites Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    
    // Mock API responses
    apiService.fetchCountryByCode.mockImplementation((code) => 
      Promise.resolve([mockCountries[code]])
    );
  });
  
  test('shows login prompt when user is not logged in', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Favorites />
        </BrowserRouter>
      </AuthProvider>
    );
    
    expect(screen.getByText('Please sign in to view and manage your favorite countries.')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
  
  test('shows message when user has no favorites', async () => {
    renderWithUser(<Favorites />);
    
    await waitFor(() => {
      expect(screen.getByText("You haven't added any countries to your favorites yet.")).toBeInTheDocument();
      expect(screen.getByText('Browse Countries')).toBeInTheDocument();
    });
  });
  
  test('fetches and displays favorite countries', async () => {
    // Mock user with favorites
    renderWithUser(<Favorites />, { favorites: ['USA', 'FRA'] });
    
    // Should show loading initially
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // Should fetch countries by code
    await waitFor(() => {
      expect(apiService.fetchCountryByCode).toHaveBeenCalledWith('USA');
      expect(apiService.fetchCountryByCode).toHaveBeenCalledWith('FRA');
    });
    
    // Should display the favorite countries
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('France')).toBeInTheDocument();
    });
  });
});