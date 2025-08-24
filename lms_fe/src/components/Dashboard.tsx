import React, { useEffect, useState } from 'react';
import { parentService } from '../services/parentService';
import { studentService } from '../services/studentService';
import { classService } from '../services/classService';
import { subscriptionService } from '../services/subscriptionService';
import { dashboardService } from '../services/dashboardService';

interface Stats {
  parents: number;
  students: number;
  classes: number;
  subscriptions: number;
}

function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    parents: 0,
    students: 0,
    classes: 0,
    subscriptions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [statistics] = await Promise.all([
        dashboardService.getStatic(),
      ]);

      setStats({
        parents: statistics.totalParents,
        students: statistics.totalStudents,
        classes: statistics.totalClasses,
        subscriptions: statistics.totalSubscriptions,
      });
      setError('');
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Không thể tải thống kê. Vui lòng kiểm tra kết nối API.');
      // Fallback to mock data if API fails
      setStats({
        parents: 0,
        students: 0,
        classes: 0,
        subscriptions: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div>Đang tải thống kê...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Chào mừng đến với hệ thống LMS</p>

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div style={{ background: '#1976d2', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{stats.parents}</h3>
          <p>Tổng số phụ huynh</p>
        </div>
        <div style={{ background: '#2e7d32', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{stats.students}</h3>
          <p>Tổng số học sinh</p>
        </div>
        <div style={{ background: '#ed6c02', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{stats.classes}</h3>
          <p>Tổng số lớp học</p>
        </div>
        <div style={{ background: '#d32f2f', color: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{stats.subscriptions}</h3>
          <p>Tổng số gói học</p>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Chào mừng đến với hệ thống LMS</h2>
        <p>Sử dụng menu bên trái để quản lý các chức năng của hệ thống:</p>
        <ul>
          <li><strong>Phụ huynh:</strong> Thêm, xem danh sách và chi tiết phụ huynh</li>
          <li><strong>Học sinh:</strong> Thêm, xem danh sách và chi tiết học sinh</li>
          <li><strong>Lớp học:</strong> Tạo lớp mới, xem danh sách và đăng ký học sinh</li>
          <li><strong>Gói học:</strong> Khởi tạo gói học và theo dõi trạng thái sử dụng</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
