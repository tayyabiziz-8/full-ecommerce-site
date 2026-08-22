import { createContext, useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

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
    queryClient.clear(); // wipe any previous account's cached data first
    localStorage.setItem(TOKEN_KEY, token);
    setUser(loggedInUser);
    return loggedInUser;
  }, [queryClient]);

  const register = useCallback(async (fields) => {
    const { token, user: newUser } = await registerRequest(fields);
    queryClient.clear();
    localStorage.setItem(TOKEN_KEY, token);
    setUser(newUser);
    return newUser;
  }, [queryClient]);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      queryClient.clear(); // drop cart/orders/wishlist/reviews from this session
    }
  }, [queryClient]);

  const updateUser = useCallback((patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}