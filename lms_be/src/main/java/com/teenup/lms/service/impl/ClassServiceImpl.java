package com.teenup.lms.service.impl;
import com.teenup.lms.dto.ClassDto;
import com.teenup.lms.entity.ClassEntity;
import com.teenup.lms.repository.ClassRepository;
import com.teenup.lms.service.ClassService;
import com.teenup.lms.service.mapper.ClassMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClassServiceImpl implements ClassService {
    private final ClassRepository repo;
    private final ClassMapper classMapper;

    @Override
    public ClassDto create(ClassDto c) {
        ClassEntity classEntity = classMapper.toEntity(c);
        classEntity = repo.save(classEntity);
        return classMapper.toDto(classEntity);
    }

    @Override
    public List<ClassDto> getByDay(String day) {
        return repo.findByDayOfWeek(day).stream().map(classMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ClassDto> getAll() {
        return repo.findAll().stream().map(classMapper::toDto).collect(Collectors.toList());
    }

}