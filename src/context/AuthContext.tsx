import React, { createContext, useCallback, useContext, useState } from "react";
import { authService } from "@/services/auth.service";
import type { Usuario } from "@/domain/types";

interface AuthContextType {
  user: Usuario | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (nombre: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(() => authService.getStoredUser());
  const [token, setToken] = useState<string | null>(() => authService.getStoredToken());

  const login = useCallback(async (email: string, password: string) => {
    const auth = await authService.login(email, password);
    setUser(auth);
    setToken(auth.token);
  }, []);

  const register = useCallback(async (nombre: string, email: string, password: string) => {
    const auth = await authService.registro(nombre, email, password);
    setUser(auth);
    setToken(auth.token);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAdmin: user?.rol === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
