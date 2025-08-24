import api from './api';

export interface Class {
  id?: number;
  name: string;
  subject: string;
  dayOfWeek: string;
  timeSlot: string;
  teacherName: string;
  maxStudents: number;
}

export const classService = {
  // Lấy danh sách lớp học
  getClasses: async (day?: string): Promise<Class[]> => {
    const params = day ? { day } : {};
    const response = await api.get('/classes', { params });
    return response.data;
  },

  // Tạo lớp học mới
  createClass: async (classData: Omit<Class, 'id'>): Promise<Class> => {
    const response = await api.post('/classes', classData);
    return response.data;
  },

  // Đăng ký học sinh vào lớp
  registerStudent: async (classId: number, studentId: number): Promise<any> => {
    const response = await api.post(`/classes/${classId}/register`, null, {
      params: { studentId }
    });
    return response.data;
  },
};
