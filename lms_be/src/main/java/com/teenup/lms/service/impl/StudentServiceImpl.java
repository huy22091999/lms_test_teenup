package com.teenup.lms.service.impl;

import com.teenup.lms.dto.StudentDto;
import com.teenup.lms.entity.Parent;
import com.teenup.lms.entity.Student;
import com.teenup.lms.repository.ParentRepository;
import com.teenup.lms.repository.StudentRepository;
import com.teenup.lms.service.StudentService;
import com.teenup.lms.service.mapper.ParentMapper;
import com.teenup.lms.service.mapper.StudentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepo;
    private final ParentRepository parentRepo;
    private final ParentMapper parentMapper;
    private final StudentMapper studentMapper;
    @Override
    public StudentDto createStudent(StudentDto dto) {
        Student student = studentMapper.toEntity(dto);
        Parent parent = parentRepo.findById(dto.getParent().getId())
                .orElseThrow(() -> new RuntimeException("Parent not found"));
        student.setParent(parent);
        studentRepo.save(student);
        StudentDto studentDto = studentMapper.toDto(student);
        studentDto.setParent(parentMapper.toDto(parent));
        return studentDto;
    }

    @Override
    public StudentDto getStudent(Long id) {
        Student student = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        StudentDto studentDto = studentMapper.toDto(student);

        studentDto.setParent(parentMapper.toDto(student.getParent()));
        return studentDto;
    }

    @Override
    public List<StudentDto> getAllStudents() {
        return studentRepo.findAll().stream().map(studentMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<StudentDto> getStudentsByIds(Set<Long> ids) {
        return studentRepo.findAllById(ids).stream().map(studentMapper::toDto).collect(Collectors.toList());
    }

}
