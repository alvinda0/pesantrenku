import api from '../config/api';
import { Pelanggaran, PelanggaranStats, JenisPelanggaran, ApiResponse } from '../types';

export const pelanggaranService = {
  getAll: async (params?: any): Promise<ApiResponse<Pelanggaran[]>> => {
    const response = await api.get<ApiResponse<Pelanggaran[]>>('/pelanggaran', { params });
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<Pelanggaran>> => {
    const response = await api.get<ApiResponse<Pelanggaran>>(`/pelanggaran/${id}`);
    return response.data;
  },

  create: async (data: Partial<Pelanggaran>): Promise<ApiResponse<Pelanggaran>> => {
    const response = await api.post<ApiResponse<Pelanggaran>>('/pelanggaran', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Pelanggaran>): Promise<ApiResponse<Pelanggaran>> => {
    const response = await api.put<ApiResponse<Pelanggaran>>(`/pelanggaran/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/pelanggaran/${id}`);
    return response.data;
  },

  getStats: async (santriId: number): Promise<ApiResponse<PelanggaranStats>> => {
    const response = await api.get<ApiResponse<PelanggaranStats>>(`/pelanggaran/stats/${santriId}`);
    return response.data;
  },

  getJenisPelanggaran: async (): Promise<ApiResponse<JenisPelanggaran[]>> => {
    const response = await api.get<ApiResponse<JenisPelanggaran[]>>('/pelanggaran/jenis');
    return response.data;
  },
};
