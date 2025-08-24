package com.teenup.lms.service;

import com.teenup.lms.dto.ClassDto;
import com.teenup.lms.entity.ClassEntity;

import java.util.List;

public interface ClassService {
    ClassDto create(ClassDto c);

    List<ClassDto> getByDay(String day);

    List<ClassDto> getAll();
}
