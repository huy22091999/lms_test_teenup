-- Parents
INSERT INTO parents (id, name, phone, email) VALUES
                                                 (1, 'Nguyễn Văn Hùng', '0901111111', 'hung.nguyen@example.com'),
                                                 (2, 'Trần Thị Mai', '0902222222', 'mai.tran@example.com');

-- Students
INSERT INTO students (id, name, dob, gender, current_grade, parent_id) VALUES
                                                                           (1, 'Nguyễn Hoàng Long', '2010-05-12', 'Male', 'Grade 8', 1),
                                                                           (2, 'Nguyễn Lan Chi', '2011-08-21', 'Female', 'Grade 7', 1),
                                                                           (3, 'Trần Minh Quân', '2009-03-30', 'Male', 'Grade 9', 2);

-- Classes
INSERT INTO classes (id, name, subject, day_of_week, time_slot, teacher_name, max_students) VALUES
                                                                                                (1, 'Toán 9A', 'Toán học', 'Monday', '08:00-09:30', 'Phạm Văn Cường', 30),
                                                                                                (2, 'Tiếng Anh 8B', 'Tiếng Anh', 'Wednesday', '10:00-11:30', 'Lê Thị Hoa', 25);

-- Class registrations
INSERT INTO class_registrations (class_id, student_id) VALUES
                                                           (1, 1),
                                                           (1, 3),
                                                           (2, 2);

-- Subscriptions
INSERT INTO subscriptions (id, student_id, package_name, start_date, end_date, total_sessions, used_sessions) VALUES
                                                                                                                  (1, 1, 'Gói Toán nâng cao 10 buổi', '2025-09-01', '2025-12-01', 10, 0),
                                                                                                                  (2, 2, 'Gói Tiếng Anh giao tiếp 5 buổi', '2025-09-05', '2025-10-05', 5, 0);