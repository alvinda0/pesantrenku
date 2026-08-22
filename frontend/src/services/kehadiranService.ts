import api from '../config/api';
import type { Kehadiran, KehadiranStats, ApiResponse } from '../types';

export const kehadiranService = {
  getAll: async (params?: any): Promise<ApiResponse<Kehadiran[]>> => {
    const response = await api.get<ApiResponse<Kehadiran[]>>('/kehadiran', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Kehadiran>> => {
    const response = await api.get<ApiResponse<Kehadiran>>(`/kehadiran/${id}`);
    return response.data;
  },

  create: async (data: Partial<Kehadiran>): Promise<ApiResponse<Kehadiran>> => {
    const response = await api.post<ApiResponse<Kehadiran>>('/kehadiran', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Kehadiran>): Promise<ApiResponse<Kehadiran>> => {
    const response = await api.put<ApiResponse<Kehadiran>>(`/kehadiran/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/kehadiran/${id}`);
    return response.data;
  },

  getStats: async (userId: number, params: any): Promise<ApiResponse<KehadiranStats>> => {
    const response = await api.get<ApiResponse<KehadiranStats>>(`/kehadiran/stats/${userId}`, { params });
    return response.data;
  },

  getDailyReport: async (tanggal: string, userType?: string): Promise<ApiResponse<any[]>> => {
    const response = await api.get<ApiResponse<any[]>>('/kehadiran/report/daily', {
      params: { tanggal, user_type: userType },
    });
    return response.data;
  },
};
