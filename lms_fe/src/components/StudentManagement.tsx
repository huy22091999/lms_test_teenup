import React, { useState, useEffect } from 'react';
import { studentService, Student } from '../services/studentService';
import { parentService, Parent } from '../services/parentService';

function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    currentGrade: '',
    parentId: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [studentsData, parentsData] = await Promise.all([
        studentService.getStudents(),
        parentService.getParents(),
      ]);
      setStudents(studentsData);
      setParents(parentsData);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối API.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const studentData = {
        name: formData.name,
        dob: formData.dob,
        gender: formData.gender,
        currentGrade: formData.currentGrade,
        parent: {
          id: parseInt(formData.parentId),
          name: ""
        },
      };
      await studentService.createStudent(studentData);
      setSuccess('Thêm học sinh thành công!');
      setFormData({ name: '', dob: '', gender: '', currentGrade: '', parentId: '' });
      setShowForm(false);
      fetchData(); // Refresh list
    } catch (err) {
      console.error('Error creating student:', err);
      setError('Không thể thêm học sinh. Vui lòng thử lại.');
    }
  };

  const handleViewStudent = async (id: number) => {
    try {
      const student = await studentService.getStudent(id);
      setSelectedStudent(student);
    } catch (err) {
      console.error('Error fetching student details:', err);
      setError('Không thể tải thông tin học sinh.');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div>Đang tải danh sách học sinh...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Quản lý Học sinh</h1>
        <button 
          onClick={() => setShowForm(true)}
          style={{ background: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Thêm Học sinh
        </button>
      </div>

      {/* Error/Success messages */}
      {error && (
        <div style={{ 
          background: '#f8d7da', 
          color: '#721c24', 
          padding: '12px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          {error}
          <button 
            onClick={() => setError('')}
            style={{ float: 'right', background: 'none', border: 'none', color: '#721c24', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}

      {success && (
        <div style={{ 
          background: '#d4edda', 
          color: '#155724', 
          padding: '12px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          border: '1px solid #c3e6cb'
        }}>
          {success}
          <button 
            onClick={() => setSuccess('')}
            style={{ float: 'right', background: 'none', border: 'none', color: '#155724', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Form thêm học sinh */}
      {showForm && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', minWidth: '400px' }}>
            <h2>Thêm Học sinh Mới</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label>Họ tên:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Ngày sinh:</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Giới tính:</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Lớp hiện tại:</label>
                <input
                  type="text"
                  value={formData.currentGrade}
                  onChange={(e) => setFormData({...formData, currentGrade: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Phụ huynh:</label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                >
                  <option value="">Chọn phụ huynh</option>
                  {parents.map(parent => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name} - {parent.phone}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  style={{ padding: '10px 20px', border: '1px solid #ddd', background: 'red', cursor: 'pointer', color: 'white' }}
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dialog xem chi tiết */}
      {selectedStudent && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', minWidth: '400px' }}>
            <h2>Chi tiết Học sinh</h2>
            <div style={{ marginBottom: '15px' }}>
              <strong>ID:</strong> {selectedStudent.id}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Họ tên:</strong> {selectedStudent.name}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Ngày sinh:</strong> {new Date(selectedStudent.dob).toLocaleDateString('vi-VN')}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Giới tính:</strong> {selectedStudent.gender === 'Male' ? 'Nam' : 'Nữ'}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Lớp hiện tại:</strong> {selectedStudent.currentGrade}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Tên Phụ huynh:</strong> {selectedStudent.parent.name}
            </div>
            <button 
              onClick={() => setSelectedStudent(null)}
              style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Bảng danh sách */}
      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ padding: '20px', margin: 0, background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
          Danh sách Học sinh ({students.length})
        </h3>
        {students.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
            Chưa có học sinh nào. Hãy thêm học sinh đầu tiên!
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f2f2f2' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Họ tên</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Ngày sinh</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Giới tính</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Lớp hiện tại</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Tên Phụ huynh</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{student.id}</td>
                  <td style={{ padding: '12px' }}>{student.name}</td>
                  <td style={{ padding: '12px' }}>{new Date(student.dob).toLocaleDateString('vi-VN')}</td>
                  <td style={{ padding: '12px' }}>{student.gender === 'Male' ? 'Nam' : 'Nữ'}</td>
                  <td style={{ padding: '12px' }}>{student.currentGrade}</td>
                  <td style={{ padding: '12px' }}>{student.parent.name}</td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => student.id && handleViewStudent(student.id)}
                      style={{ background: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentManagement;
