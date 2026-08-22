import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import api from '../config/api';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      // Fetch user profile after setting token
      fetchUserProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (authToken: string) => {
    try {
      // Set token in axios header
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      
      const response = await authService.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // If token invalid, clear storage
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const jwtToken = await authService.login({ email, password });

      localStorage.setItem('token', jwtToken);
      setToken(jwtToken);

      // Set token in axios header
      api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

      // Fetch user profile
      const response = await authService.getProfile();
      setUser(response.data);

    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login gagal');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
