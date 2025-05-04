import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header Component', () => {
  const mockProps = {
    search: '',
    setSearch: jest.fn(),
    region: '',
    setRegion: jest.fn(),
    language: '',
    setLanguage: jest.fn(),
  };
  
  test('renders all filter elements correctly', () => {
    render(<Header {...mockProps} />);
    
    // Check search input
    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument();
    
    // Check region filter
    expect(screen.getByText('Filter by Region')).toBeInTheDocument();
    
    // Check language filter
    expect(screen.getByText('Filter by Language')).toBeInTheDocument();
  });
  
  test('calls setSearch when search input changes', () => {
    render(<Header {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'United' } });
    
    expect(mockProps.setSearch).toHaveBeenCalledWith('United');
  });
  
  test('calls setRegion when region selection changes', () => {
    render(<Header {...mockProps} />);
    
    const regionSelect = screen.getByText('Filter by Region').closest('select');
    fireEvent.change(regionSelect, { target: { value: 'Europe' } });
    
    expect(mockProps.setRegion).toHaveBeenCalledWith('Europe');
  });
  
  test('calls setLanguage when language selection changes', () => {
    render(<Header {...mockProps} />);
    
    const languageSelect = screen.getByText('Filter by Language').closest('select');
    fireEvent.change(languageSelect, { target: { value: 'English' } });
    
    expect(mockProps.setLanguage).toHaveBeenCalledWith('English');
  });
});