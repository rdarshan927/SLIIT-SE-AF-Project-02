import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import Login from '../Login';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Login Component', () => {
  test('renders login form correctly', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>
    );
    
    // Check heading
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    
    // Check form elements
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    
    // Check link to register
    expect(screen.getByText('create a new account')).toBeInTheDocument();
  });
  
  test('validates form input', async () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>
    );
    
    // Try to submit with empty fields
    const submitButton = screen.getByRole('button', { name: /Sign in/i });
    fireEvent.click(submitButton);
    
    // Email and password fields are required
    const emailInput = screen.getByPlaceholderText('Email address');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
    
    // Fill in with invalid short password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.click(submitButton);
    
    // Should show error for short password
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
  
  test('remembers user choice', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>
    );
    
    const rememberMeCheckbox = screen.getByLabelText('Remember me');
    
    // Initially unchecked
    expect(rememberMeCheckbox).not.toBeChecked();
    
    // Toggle remember me
    fireEvent.click(rememberMeCheckbox);
    
    // Should be checked now
    expect(rememberMeCheckbox).toBeChecked();
  });
});