package com.teenup.lms.repository;


import com.teenup.lms.entity.ClassRegistration;
import com.teenup.lms.entity.ClassRegistrationId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassRegistrationRepository extends JpaRepository<ClassRegistration, ClassRegistrationId> {
    List<ClassRegistration> findByStudentId(Long studentId);
}
