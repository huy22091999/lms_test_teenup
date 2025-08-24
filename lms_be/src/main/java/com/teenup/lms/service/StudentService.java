package com.teenup.lms.service;

import com.teenup.lms.dto.StudentDto;

import java.util.List;
import java.util.Set;

public interface StudentService {
    StudentDto createStudent(StudentDto student);

    StudentDto getStudent(Long id);

    List<StudentDto> getAllStudents();

    List<StudentDto> getStudentsByIds(Set<Long> ids);
}
