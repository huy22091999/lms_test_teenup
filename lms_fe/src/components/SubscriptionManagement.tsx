import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
} from '@mui/material';
import { Add as AddIcon, CheckCircle as UseIcon } from '@mui/icons-material';
import { Subscription, subscriptionService } from '../services/subscriptionService';
import { Student, studentService } from '../services/studentService';

const SubscriptionManagement: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const [formData, setFormData] = useState({
    studentId: '',
    packageName: '',
    startDate: '',
    endDate: '',
    totalSessions: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subscriptionsData, studentsData] = await Promise.all([
        subscriptionService.getSubscriptions(),
        studentService.getStudents(),
      ]);
      setSubscriptions(subscriptionsData);
      setStudents(studentsData);
    } catch (error) {
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const subscriptionData = {
        studentId: parseInt(formData.studentId),
        packageName: formData.packageName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalSessions: parseInt(formData.totalSessions),
        usedSessions: 0,
      };
      await subscriptionService.createSubscription(subscriptionData);
      setSuccess('Tạo gói học thành công!');
      setOpenDialog(false);
      setFormData({ studentId: '', packageName: '', startDate: '', endDate: '', totalSessions: '' });
      fetchData();
    } catch (error) {
      setError('Không thể tạo gói học');
    }
  };

  const handleUseSession = async (id: number) => {
    try {
      await subscriptionService.useSession(id);
      setSuccess('Đánh dấu sử dụng buổi học thành công!');
      fetchData();
    } catch (error) {
      setError('Không thể đánh dấu sử dụng buổi học');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getProgressColor = (used: number, total: number) => {
    const percentage = (used / total) * 100;
    if (percentage >= 80) return 'error';
    if (percentage >= 60) return 'warning';
    return 'success';
  };

  const getStudentName = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Không tìm thấy';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Quản lý Gói học</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Tạo Gói học
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Danh sách Gói học ({subscriptions.length})
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Học sinh</TableCell>
                  <TableCell>Tên gói</TableCell>
                  <TableCell>Ngày bắt đầu</TableCell>
                  <TableCell>Ngày kết thúc</TableCell>
                  <TableCell>Tiến độ</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptions.map((subscription) => {
                  const progress = (subscription.usedSessions / subscription.totalSessions) * 100;
                  const isCompleted = subscription.usedSessions >= subscription.totalSessions;
                  
                  return (
                    <TableRow key={subscription.id}>
                      <TableCell>{subscription.id}</TableCell>
                      <TableCell>{getStudentName(subscription.studentId)}</TableCell>
                      <TableCell>{subscription.packageName}</TableCell>
                      <TableCell>
                        {new Date(subscription.startDate).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell>
                        {new Date(subscription.endDate).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                              color={getProgressColor(subscription.usedSessions, subscription.totalSessions)}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {subscription.usedSessions}/{subscription.totalSessions}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={isCompleted ? 'Hoàn thành' : 'Đang học'}
                          color={isCompleted ? 'success' : 'primary'}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        {!isCompleted && subscription.id && (
                          <IconButton
                            color="primary"
                            onClick={() => subscription.id && handleUseSession(subscription.id)}
                            title="Đánh dấu đã sử dụng 1 buổi"
                          >
                            <UseIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog tạo gói học */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tạo Gói học Mới</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth required>
                <InputLabel>Chọn học sinh</InputLabel>
                <Select
                  value={formData.studentId}
                  label="Chọn học sinh"
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                >
                  {students.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.name} - {student.currentGrade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Tên gói học"
                value={formData.packageName}
                onChange={(e) => handleInputChange('packageName', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Ngày bắt đầu"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                fullWidth
                label="Ngày kết thúc"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
              <TextField
                fullWidth
                label="Tổng số buổi học"
                type="number"
                value={formData.totalSessions}
                onChange={(e) => handleInputChange('totalSessions', e.target.value)}
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
            <Button type="submit" variant="contained">Tạo</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default SubscriptionManagement;
