import api from '../config/api';
import type { LoginCredentials, RegisterData, User, ApiResponse } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<string> => {
    const response = await api.post<ApiResponse<string>>('/auth/login', credentials);
    return response.data.data; // Return JWT token directly
  },

  register: async (data: RegisterData): Promise<string> => {
    const response = await api.post<ApiResponse<string>>('/auth/register', data);
    return response.data.data; // Return JWT token directly
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>('/auth/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>('/auth/profile', data);
    return response.data;
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>('/auth/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
    });
    return response.data;
  },
};
