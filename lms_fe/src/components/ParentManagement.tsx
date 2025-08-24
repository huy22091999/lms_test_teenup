import React, { useState, useEffect } from 'react';
import { parentService, Parent } from '../services/parentService';

function ParentManagement() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);

  // Fetch parents from API
  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      setLoading(true);
      const data = await parentService.getParents();
      setParents(data);
      setError('');
    } catch (err) {
      console.error('Error fetching parents:', err);
      setError('Không thể tải danh sách phụ huynh. Vui lòng kiểm tra kết nối API.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await parentService.createParent(formData);
      setSuccess('Thêm phụ huynh thành công!');
      setFormData({ name: '', phone: '', email: '' });
      setShowForm(false);
      fetchParents(); // Refresh list
    } catch (err) {
      console.error('Error creating parent:', err);
      setError('Không thể thêm phụ huynh. Vui lòng thử lại.');
    }
  };

  const handleViewParent = async (id: number) => {
    try {
      const parent = await parentService.getParent(id);
      setSelectedParent(parent);
    } catch (err) {
      console.error('Error fetching parent details:', err);
      setError('Không thể tải thông tin phụ huynh.');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div>Đang tải danh sách phụ huynh...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Quản lý Phụ huynh</h1>
        <button 
          onClick={() => setShowForm(true)}
          style={{ background: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Thêm Phụ huynh
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

      {/* Form thêm phụ huynh */}
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
            <h2>Thêm Phụ huynh Mới</h2>
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
                <label>Số điện thoại:</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
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
      {selectedParent && (
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
            <h2>Chi tiết Phụ huynh</h2>
            <div style={{ marginBottom: '15px' }}>
              <strong>ID:</strong> {selectedParent.id}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Họ tên:</strong> {selectedParent.name}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Số điện thoại:</strong> {selectedParent.phone}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Email:</strong> {selectedParent.email}
            </div>
            <button 
              onClick={() => setSelectedParent(null)}
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
          Danh sách Phụ huynh ({parents.length})
        </h3>
        {parents.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
            Chưa có phụ huynh nào. Hãy thêm phụ huynh đầu tiên!
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f2f2f2' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Họ tên</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Số điện thoại</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {parents.map(parent => (
                <tr key={parent.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{parent.id}</td>
                  <td style={{ padding: '12px' }}>{parent.name}</td>
                  <td style={{ padding: '12px' }}>{parent.phone}</td>
                  <td style={{ padding: '12px' }}>{parent.email}</td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => parent.id && handleViewParent(parent.id)}
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

export default ParentManagement;
