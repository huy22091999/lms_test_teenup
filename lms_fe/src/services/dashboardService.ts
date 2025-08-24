import api from './api';

export interface Statistics {
  totalStudents: number;
  totalParents: number;
  totalClasses: number;
  totalSubscriptions: number;
}

export const dashboardService = {
  // Lấy thống kê
  getStatic: async (): Promise<Statistics> => {
    const response = await api.get('/statistics');
    return response.data;
  },



};
