package com.teenup.lms.service;

import com.teenup.lms.entity.ClassRegistration;

public interface ClassRegistrationService {
    ClassRegistration register(Long classId, Long studentId);
}
