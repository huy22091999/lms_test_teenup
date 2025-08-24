package com.teenup.lms.controler;

import com.teenup.lms.dto.StudentDto;
import com.teenup.lms.entity.Student;
import com.teenup.lms.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @PostMapping
    public ResponseEntity<StudentDto> create(@RequestBody StudentDto student) {
        return ResponseEntity.ok(studentService.createStudent(student));
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudent(id));
    }

    @GetMapping
    public ResponseEntity<List<StudentDto>> getAll() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }
}