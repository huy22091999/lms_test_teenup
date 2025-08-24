package com.teenup.lms.controler;

import com.teenup.lms.entity.ClassRegistration;
import com.teenup.lms.entity.Student;
import com.teenup.lms.service.ClassRegistrationService;
import com.teenup.lms.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class ClassRegistrationController {
    private final ClassRegistrationService regService;

    @PostMapping("/{classId}/register")
    public ResponseEntity<ClassRegistration> register(@PathVariable Long classId,
                                                      @RequestParam Long studentId) {
        return ResponseEntity.ok(regService.register(classId, studentId));
    }
}