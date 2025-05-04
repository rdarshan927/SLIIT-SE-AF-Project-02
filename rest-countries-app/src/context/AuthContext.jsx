import React, { createContext, useState, useEffect, useContext } from 'react';

// Simulated user database in localStorage
const getUsersFromStorage = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : {};
};

const saveUsersToStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  // Login function that checks against stored users
  const login = (email, password) => {
    if (!email || !password || password.length < 6) {
      throw new Error('Invalid credentials');
    }
    
    const users = getUsersFromStorage();
    
    // Check if user exists
    if (users[email]) {
      // In a real app, you would validate the password hash here
      // For this demo, we're simply checking if the account exists
      const user = users[email];
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } else {
      // Create a new user if it doesn't exist
      const newUser = {
        id: 'user-' + Date.now(),
        email,
        name: email.split('@')[0],
        favorites: []
      };
      
      // Save to our "database"
      users[email] = newUser;
      saveUsersToStorage(users);
      
      // Set as current user
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return newUser;
    }
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };
  
  // Function to add/remove favorites
  const toggleFavorite = (countryCode) => {
    if (!currentUser) return;
    
    const users = getUsersFromStorage();
    const userEmail = currentUser.email;
    
    let updatedFavorites;
    if (currentUser.favorites.includes(countryCode)) {
      updatedFavorites = currentUser.favorites.filter(code => code !== countryCode);
    } else {
      updatedFavorites = [...currentUser.favorites, countryCode];
    }
    
    // Update the user in our context
    const updatedUser = {
      ...currentUser,
      favorites: updatedFavorites
    };
    
    // Update the user in our "database"
    users[userEmail] = updatedUser;
    
    // Save changes
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    saveUsersToStorage(users);
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