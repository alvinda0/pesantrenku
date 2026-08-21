import api from '../config/api';
import { JurnalShalat, JurnalShalatStats, ApiResponse } from '../types';

export const shalatService = {
  getAll: async (params?: any): Promise<ApiResponse<JurnalShalat[]>> => {
    const response = await api.get<ApiResponse<JurnalShalat[]>>('/shalat', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<JurnalShalat>> => {
    const response = await api.get<ApiResponse<JurnalShalat>>(`/shalat/${id}`);
    return response.data;
  },

  createOrUpdate: async (data: Partial<JurnalShalat>): Promise<ApiResponse<JurnalShalat>> => {
    const response = await api.post<ApiResponse<JurnalShalat>>('/shalat', data);
    return response.data;
  },

  update: async (id: number, data: Partial<JurnalShalat>): Promise<ApiResponse<JurnalShalat>> => {
    const response = await api.put<ApiResponse<JurnalShalat>>(`/shalat/${id}`, data);
    return response.data;
  },

  getStats: async (santriId: number, params: any): Promise<ApiResponse<JurnalShalatStats>> => {
    const response = await api.get<ApiResponse<JurnalShalatStats>>(`/shalat/stats/${santriId}`, { params });
    return response.data;
  },

  getDailyReport: async (tanggal: string): Promise<ApiResponse<any[]>> => {
    const response = await api.get<ApiResponse<any[]>>('/shalat/report/daily', {
      params: { tanggal },
    });
    return response.data;
  },
};
