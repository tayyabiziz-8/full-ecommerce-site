import { createContext, useState, useEffect, useCallback } from "react";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  getCurrentUserRequest,
} from "../api/auth.api.js";

const TOKEN_KEY = "shopped_token";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }
    getCurrentUserRequest()
      .then(setUser)
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (credentials) => {
    const { token, user: loggedInUser } = await loginRequest(credentials);
    localStorage.setItem(TOKEN_KEY, token);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const register = useCallback(async (fields) => {
    const { token, user: newUser } = await registerRequest(fields);
    localStorage.setItem(TOKEN_KEY, token);
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    }
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}