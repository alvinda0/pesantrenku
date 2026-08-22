import api from '../config/api';
import type { User, ApiResponse } from '../types';

interface GetAllUsersParams {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}

export const userService = {
  getAll: async (params?: GetAllUsersParams): Promise<ApiResponse<User[]>> => {
    const response = await api.get<ApiResponse<User[]>>('/users', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },

  update: async (id: number, data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/users/${id}`);
    return response.data;
  },

  getStats: async (): Promise<ApiResponse<any>> => {
    const response = await api.get<ApiResponse<any>>('/users/stats/summary');
    return response.data;
  },
};
