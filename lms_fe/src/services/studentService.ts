import api from './api';

export interface Student {
  id?: number;
  name: string;
  dob: string;
  gender: string;
  currentGrade: string;
  parent: {
    id: number;
    name: string;
  };
}

export const studentService = {
  // Lấy danh sách học sinh
  getStudents: async (): Promise<Student[]> => {
    const response = await api.get('/students');
    return response.data;
  },

  // Lấy chi tiết học sinh
  getStudent: async (id: number): Promise<Student> => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  // Tạo học sinh mới
  createStudent: async (student: Omit<Student, 'id'>): Promise<Student> => {
    const response = await api.post('/students', student);
    return response.data;
  },
};
