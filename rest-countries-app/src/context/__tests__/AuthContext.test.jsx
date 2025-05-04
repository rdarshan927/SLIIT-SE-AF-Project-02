import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

// Test component that uses the auth context
const TestComponent = () => {
  const { currentUser, login, logout, toggleFavorite, isFavorite } = useAuth();
  
  return (
    <div>
      <div data-testid="user-status">
        {currentUser ? `Logged in as ${currentUser.email}` : 'Not logged in'}
      </div>
      <button 
        data-testid="login-btn" 
        onClick={() => login('test@example.com', 'password123')}
      >
        Login
      </button>
      <button 
        data-testid="logout-btn" 
        onClick={logout}
      >
        Logout
      </button>
      <button 
        data-testid="favorite-btn" 
        onClick={() => toggleFavorite('USA')}
      >
        Toggle Favorite
      </button>
      <div data-testid="is-favorite">
        {isFavorite('USA') ? 'Is favorite' : 'Not favorite'}
      </div>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });
  
  test('provides authentication functionality', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    // Initially not logged in
    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('Not favorite');
    
    // Login
    await act(async () => {
      fireEvent.click(screen.getByTestId('login-btn'));
    });
    
    // Should be logged in now
    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in as test@example.com');
    
    // Toggle favorite
    await act(async () => {
      fireEvent.click(screen.getByTestId('favorite-btn'));
    });
    
    // Should be a favorite now
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('Is favorite');
    
    // Toggle favorite again
    await act(async () => {
      fireEvent.click(screen.getByTestId('favorite-btn'));
    });
    
    // Should not be a favorite anymore
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('Not favorite');
    
    // Logout
    await act(async () => {
      fireEvent.click(screen.getByTestId('logout-btn'));
    });
    
    // Should be logged out now
    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
  });
  
  test('persists user data in localStorage', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    // Login
    await act(async () => {
      fireEvent.click(screen.getByTestId('login-btn'));
    });
    
    // Check localStorage was updated
    expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', expect.any(String));
    expect(localStorage.setItem).toHaveBeenCalledWith('users', expect.any(String));
    
    // Add favorite
    await act(async () => {
      fireEvent.click(screen.getByTestId('favorite-btn'));
    });
    
    // Check localStorage was updated with favorites
    expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', expect.stringContaining('USA'));
  });
});