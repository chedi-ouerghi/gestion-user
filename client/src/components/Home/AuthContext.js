// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  userId: null,
  // other auth-related state
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userId: action.payload.userId };
    case 'LOGOUT':
      return initialState;
    // handle other auth-related actions
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Additional logic to persist user authentication state
  useEffect(() => {
    // Check local storage, cookies, or other storage mechanisms to restore auth state
    // ...

    // For example, you might check local storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      dispatch({ type: 'LOGIN', payload: { userId: storedUserId } });
    }
  }, []);

   const login = (userId) => {
    dispatch({ type: 'LOGIN', payload: { userId } });
    localStorage.setItem('userId', userId);
  };


  const logout = () => {
    // Additional logic for logout (e.g., API calls, clearing data)
    // ...

    // Dispatch action to clear auth state
    dispatch({ type: 'LOGOUT' });

    // Clear persisted data (e.g., local storage, cookies)
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
