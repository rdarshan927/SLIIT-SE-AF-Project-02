import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Home from '../Home';
import * as apiService from '../../services/api';

// Mock the API service
jest.mock('../../services/api');

// Sample country data
const mockCountries = [
  {
    name: { common: 'United States' },
    flags: { svg: 'https://example.com/us-flag.svg' },
    capital: ['Washington, D.C.'],
    region: 'Americas',
    population: 331000000,
    cca3: 'USA'
  },
  {
    name: { common: 'United Kingdom' },
    flags: { svg: 'https://example.com/uk-flag.svg' },
    capital: ['London'],
    region: 'Europe',
    population: 67000000,
    cca3: 'GBR'
  }
];

describe('Home Page', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock the API calls
    apiService.fetchAllCountries.mockResolvedValue(mockCountries);
    apiService.fetchCountryByName.mockResolvedValue([mockCountries[0]]);
    apiService.fetchCountryByRegion.mockResolvedValue([mockCountries[1]]);
    apiService.fetchCountryByLanguage.mockResolvedValue([mockCountries[0]]);
  });
  
  test('fetches and displays countries on initial load', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthProvider>
    );
    
    // Should show loading state initially
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    });
    
    // Should have called the API
    expect(apiService.fetchAllCountries).toHaveBeenCalled();
  });
  
  test('filters countries by search term', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthProvider>
    );
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });
    
    // Search for "United States"
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'United States' } });
    
    // Should call the search API
    await waitFor(() => {
      expect(apiService.fetchCountryByName).toHaveBeenCalledWith('United States');
    });
    
    // Should show only the US
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.queryByText('United Kingdom')).not.toBeInTheDocument();
    });
  });
  
  test('filters countries by region', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthProvider>
    );
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    });
    
    // Filter by Europe
    const regionSelect = screen.getByText('Filter by Region').closest('select');
    fireEvent.change(regionSelect, { target: { value: 'Europe' } });
    
    // Should call the region API
    await waitFor(() => {
      expect(apiService.fetchCountryByRegion).toHaveBeenCalledWith('Europe');
    });
    
    // Should show only the UK
    await waitFor(() => {
      expect(screen.queryByText('United States')).not.toBeInTheDocument();
      expect(screen.getByText('United Kingdom')).toBeInTheDocument();
    });
  });
  
  test('filters countries by language', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthProvider>
    );
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });
    
    // Filter by English
    const languageSelect = screen.getByText('Filter by Language').closest('select');
    fireEvent.change(languageSelect, { target: { value: 'English' } });
    
    // Should call the language API
    await waitFor(() => {
      expect(apiService.fetchCountryByLanguage).toHaveBeenCalledWith('English');
    });
    
    // Should show only the US based on our mock
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.queryByText('United Kingdom')).not.toBeInTheDocument();
    });
  });
});