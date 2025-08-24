import api from './api';

export interface Parent {
  id?: number;
  name: string;
  phone: string;
  email: string;
}

export const parentService = {
  // Lấy danh sách phụ huynh
  getParents: async (): Promise<Parent[]> => {
    const response = await api.get('/parents');
    return response.data;
  },

  // Lấy chi tiết phụ huynh
  getParent: async (id: number): Promise<Parent> => {
    const response = await api.get(`/parents/${id}`);
    return response.data;
  },

  // Tạo phụ huynh mới
  createParent: async (parent: Omit<Parent, 'id'>): Promise<Parent> => {
    const response = await api.post('/parents', parent);
    return response.data;
  },
};
