import api from '../config/api';
import { Tahfidz, TahfidzStats, ApiResponse } from '../types';

export const tahfidzService = {
  getAll: async (params?: any): Promise<ApiResponse<Tahfidz[]>> => {
    const response = await api.get<ApiResponse<Tahfidz[]>>('/tahfidz', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Tahfidz>> => {
    const response = await api.get<ApiResponse<Tahfidz>>(`/tahfidz/${id}`);
    return response.data;
  },

  create: async (data: Partial<Tahfidz>): Promise<ApiResponse<Tahfidz>> => {
    const response = await api.post<ApiResponse<Tahfidz>>('/tahfidz', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Tahfidz>): Promise<ApiResponse<Tahfidz>> => {
    const response = await api.put<ApiResponse<Tahfidz>>(`/tahfidz/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/tahfidz/${id}`);
    return response.data;
  },

  getStats: async (santriId: number): Promise<ApiResponse<TahfidzStats>> => {
    const response = await api.get<ApiResponse<TahfidzStats>>(`/tahfidz/stats/${santriId}`);
    return response.data;
  },
};
