package com.teenup.lms.service.impl;

import com.teenup.lms.entity.ClassEntity;
import com.teenup.lms.entity.ClassRegistration;
import com.teenup.lms.entity.Student;
import com.teenup.lms.repository.ClassRegistrationRepository;
import com.teenup.lms.repository.ClassRepository;
import com.teenup.lms.repository.StudentRepository;
import com.teenup.lms.service.ClassRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassRegistrationServiceImpl implements ClassRegistrationService {
    private final ClassRegistrationRepository regRepo;
    private final StudentRepository studentRepo;
    private final ClassRepository classRepo;


    @Override
    public ClassRegistration register(Long classId, Long studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        ClassEntity targetClass = classRepo.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found"));

        // check trùng lịch
        List<ClassRegistration> existing = regRepo.findByStudentId(studentId);
        for (ClassRegistration reg : existing) {
            ClassEntity sc = reg.getClassEntity();
            if (sc.getDayOfWeek().equals(targetClass.getDayOfWeek()) &&
                    sc.getTimeSlot().equals(targetClass.getTimeSlot())) {
                throw new RuntimeException("Student already registered another class in same slot!");
            }
        }

        ClassRegistration reg = new ClassRegistration();
        reg.setClassEntity(targetClass);
        reg.setStudent(student);
        return regRepo.save(reg);
    }

}
