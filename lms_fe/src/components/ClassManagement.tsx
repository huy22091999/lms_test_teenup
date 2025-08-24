import React, { useEffect, useState, useCallback } from 'react';
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
} from '@mui/material';
import { Add as AddIcon, PersonAdd as RegisterIcon } from '@mui/icons-material';
import { Class, classService } from '../services/classService';
import { Student, studentService } from '../services/studentService';

const ClassManagement: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    dayOfWeek: '',
    timeSlot: '',
    teacherName: '',
    maxStudents: '',
  });

  const [registerData, setRegisterData] = useState({
    studentId: '',
  });

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [classesData, studentsData] = await Promise.all([
        classService.getClasses(selectedDay || undefined),
        studentService.getStudents(),
      ]);
      setClasses(classesData);
      setStudents(studentsData);
    } catch (error) {
      setError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }, [selectedDay]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const classData = {
        name: formData.name,
        subject: formData.subject,
        dayOfWeek: formData.dayOfWeek,
        timeSlot: formData.timeSlot,
        teacherName: formData.teacherName,
        maxStudents: parseInt(formData.maxStudents),
      };
      await classService.createClass(classData);
      setSuccess('Tạo lớp học thành công!');
      setOpenDialog(false);
      setFormData({ name: '', subject: '', dayOfWeek: '', timeSlot: '', teacherName: '', maxStudents: '' });
      fetchData();
    } catch (error) {
      setError('Không thể tạo lớp học');
    }
  };

  const handleRegisterStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) return;
    
    try {
      await classService.registerStudent(selectedClass.id!, parseInt(registerData.studentId));
      setSuccess('Đăng ký học sinh thành công!');
      setOpenRegisterDialog(false);
      setRegisterData({ studentId: '' });
      fetchData();
    } catch (error) {
      setError('Không thể đăng ký học sinh');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegisterInputChange = (field: string, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
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
        <Typography variant="h4">Quản lý Lớp học</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Tạo Lớp học
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

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lọc theo ngày
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Chọn ngày</InputLabel>
            <Select
              value={selectedDay}
              label="Chọn ngày"
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <MenuItem value="">Tất cả các ngày</MenuItem>
              {daysOfWeek.map((day) => (
                <MenuItem key={day} value={day}>
                  {day === 'Monday' && 'Thứ 2'}
                  {day === 'Tuesday' && 'Thứ 3'}
                  {day === 'Wednesday' && 'Thứ 4'}
                  {day === 'Thursday' && 'Thứ 5'}
                  {day === 'Friday' && 'Thứ 6'}
                  {day === 'Saturday' && 'Thứ 7'}
                  {day === 'Sunday' && 'Chủ nhật'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Danh sách Lớp học ({classes.length})
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên lớp</TableCell>
                  <TableCell>Môn học</TableCell>
                  <TableCell>Ngày học</TableCell>
                  <TableCell>Giờ học</TableCell>
                  <TableCell>Giáo viên</TableCell>
                  <TableCell>Sĩ số tối đa</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell>{classItem.id}</TableCell>
                    <TableCell>{classItem.name}</TableCell>
                    <TableCell>{classItem.subject}</TableCell>
                    <TableCell>
                      <Chip 
                        label={
                          classItem.dayOfWeek === 'Monday' ? 'Thứ 2' :
                          classItem.dayOfWeek === 'Tuesday' ? 'Thứ 3' :
                          classItem.dayOfWeek === 'Wednesday' ? 'Thứ 4' :
                          classItem.dayOfWeek === 'Thursday' ? 'Thứ 5' :
                          classItem.dayOfWeek === 'Friday' ? 'Thứ 6' :
                          classItem.dayOfWeek === 'Saturday' ? 'Thứ 7' : 'Chủ nhật'
                        }
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{classItem.timeSlot}</TableCell>
                    <TableCell>{classItem.teacherName}</TableCell>
                    <TableCell>{classItem.maxStudents}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          if (classItem.id) {
                            setSelectedClass(classItem);
                            setOpenRegisterDialog(true);
                          }
                        }}
                      >
                        <RegisterIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog tạo lớp học */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Tạo Lớp học Mới</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Tên lớp"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Môn học"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                required
              />
              <FormControl fullWidth required>
                <InputLabel>Ngày học</InputLabel>
                <Select
                  value={formData.dayOfWeek}
                  label="Ngày học"
                  onChange={(e) => handleInputChange('dayOfWeek', e.target.value)}
                >
                  {daysOfWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day === 'Monday' && 'Thứ 2'}
                      {day === 'Tuesday' && 'Thứ 3'}
                      {day === 'Wednesday' && 'Thứ 4'}
                      {day === 'Thursday' && 'Thứ 5'}
                      {day === 'Friday' && 'Thứ 6'}
                      {day === 'Saturday' && 'Thứ 7'}
                      {day === 'Sunday' && 'Chủ nhật'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Giờ học (VD: 08:00-09:30)"
                value={formData.timeSlot}
                onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Tên giáo viên"
                value={formData.teacherName}
                onChange={(e) => handleInputChange('teacherName', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Sĩ số tối đa"
                type="number"
                value={formData.maxStudents}
                onChange={(e) => handleInputChange('maxStudents', e.target.value)}
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

      {/* Dialog đăng ký học sinh */}
      <Dialog open={openRegisterDialog} onClose={() => setOpenRegisterDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Đăng ký Học sinh vào Lớp</DialogTitle>
        <form onSubmit={handleRegisterStudent}>
          <DialogContent>
            {selectedClass && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Lớp: {selectedClass.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedClass.subject} - {selectedClass.teacherName}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth required>
                <InputLabel>Chọn học sinh</InputLabel>
                <Select
                  value={registerData.studentId}
                  label="Chọn học sinh"
                  onChange={(e) => handleRegisterInputChange('studentId', e.target.value)}
                >
                  {students.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.name} - {student.currentGrade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRegisterDialog(false)}>Hủy</Button>
            <Button type="submit" variant="contained">Đăng ký</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ClassManagement;
