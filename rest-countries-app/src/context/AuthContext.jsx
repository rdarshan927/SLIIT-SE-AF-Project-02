import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  // Simple login function - in a real app, you'd connect to a backend service
  const login = (email, password) => {
    // For demo purposes, accept any valid-looking email and password
    if (!email || !password || password.length < 6) {
      throw new Error('Invalid credentials');
    }
    
    // Create a demo user object
    const user = {
      id: 'user-' + Date.now(),
      email,
      name: email.split('@')[0],
      favorites: []
    };
    
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };
  
  // Function to add/remove favorites
  const toggleFavorite = (countryCode) => {
    if (!currentUser) return;
    
    let updatedFavorites;
    if (currentUser.favorites.includes(countryCode)) {
      updatedFavorites = currentUser.favorites.filter(code => code !== countryCode);
    } else {
      updatedFavorites = [...currentUser.favorites, countryCode];
    }
    
    const updatedUser = {
      ...currentUser,
      favorites: updatedFavorites
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  const isFavorite = (countryCode) => {
    return currentUser && currentUser.favorites.includes(countryCode);
  };
  
  const value = {
    currentUser,
    login,
    logout,
    toggleFavorite,
    isFavorite,
    loading
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);