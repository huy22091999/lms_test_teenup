import api from './api';

export interface Subscription {
  id?: number;
  studentId: number;
  packageName: string;
  startDate: string;
  endDate: string;
  totalSessions: number;
  usedSessions: number;
}

export const subscriptionService = {
  // Lấy danh sách gói học
  getSubscriptions: async (): Promise<Subscription[]> => {
    const response = await api.get('/subscriptions');
    return response.data;
  },

  // Lấy chi tiết gói học
  getSubscription: async (id: number): Promise<Subscription> => {
    const response = await api.get(`/subscriptions/${id}`);
    return response.data;
  },

  // Tạo gói học mới
  createSubscription: async (subscription: Omit<Subscription, 'id'>): Promise<Subscription> => {
    const response = await api.post('/subscriptions', subscription);
    return response.data;
  },

  // Đánh dấu đã sử dụng 1 buổi
  useSession: async (id: number): Promise<any> => {
    const response = await api.patch(`/subscriptions/${id}/use`);
    return response.data;
  },
};
