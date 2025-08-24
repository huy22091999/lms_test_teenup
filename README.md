1. Cách dựng project
Yêu cầu

Cài sẵn Docker và Docker Compose

Cách chạy

Clone file docker-compose.yml và sửa IP hoặc domain của BE

Sau đó chạy lệnh: docker compose up -d

Các service sẽ được chạy:

Backend (Spring Boot): http://localhost:8080

Frontend (React + Nginx): http://localhost:3000

Database (Postgres): localhost:5432 (user: appuser, pass: secret, db: appdb)


2. Database schema sơ lược

### **parents**
- `id` (PK, auto increment)  
- `name` (varchar)  
- `phone` (varchar)  
- `email` (varchar)  

### **students**
- `id` (PK, auto increment)  
- `name` (varchar)  
- `dob` (date)  
- `gender` (Male/Female)  
- `current_grade` (varchar)  
- `parent_id` (FK → `parents.id`)  

### **classes**
- `id` (PK, auto increment)  
- `name` (tên lớp)  
- `subject` (môn học)  
- `day_of_week` (thứ trong tuần)  
- `time_slot` (khung giờ)  
- `teacher_name` (giáo viên)  
- `max_students` (int)  

### **class_registrations**
- `class_id` (FK → `classes.id`)  
- `student_id` (FK → `students.id`)  
- (PK gồm `class_id` + `student_id`)  

### **subscriptions** (gói học)
- `id` (PK, auto increment)  
- `student_id` (FK → `students.id`)  
- `package_name` (varchar)  
- `start_date` (date)  
- `end_date` (date)  
- `total_sessions` (int)  
- `used_sessions` (int)  


3. Các endpoint chính
📊 Dashboard

GET /api/statistics → xem thống kê hệ thống

👨‍👩‍👧 Phụ huynh

POST /api/parents → tạo phụ huynh

GET /api/parents → danh sách phụ huynh

GET /api/parents/{id} → chi tiết phụ huynh

👩‍🎓 Học sinh

POST /api/students → tạo học sinh (gắn với parent)

GET /api/students → danh sách học sinh

GET /api/students/{id} → chi tiết học sinh + thông tin phụ huynh

🏫 Lớp học

POST /api/classes → tạo lớp mới

GET /api/classes?day=Monday → danh sách lớp theo ngày

POST /api/classes/{classId}/register?studentId={id} → đăng ký học sinh vào lớp

🎫 Gói học (Subscriptions)

POST /api/subscriptions → khởi tạo gói học

PATCH /api/subscriptions/{id}/use → đánh dấu đã dùng 1 buổi

GET /api/subscriptions/{id} → xem trạng thái gói học


