package com.teenup.lms.service.impl;

import com.teenup.lms.dto.StudentDto;
import com.teenup.lms.dto.SubscriptionDto;
import com.teenup.lms.entity.Student;
import com.teenup.lms.entity.Subscription;
import com.teenup.lms.repository.StudentRepository;
import com.teenup.lms.repository.SubscriptionRepository;
import com.teenup.lms.service.StudentService;
import com.teenup.lms.service.SubscriptionService;
import com.teenup.lms.service.mapper.SubscriptionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {
    private final SubscriptionRepository subRepo;
    private final StudentRepository studentRepo;
    private final SubscriptionMapper mapper;
    private final StudentService studentService;

    @Override
    public SubscriptionDto create(SubscriptionDto subscription) {
        Student student = studentRepo.findById(subscription.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Subscription entity = mapper.toEntity(subscription);
        entity.setStudent(student);
        entity.setUsedSessions(0);
        entity = subRepo.save(entity);
        return mapper.toDto(entity);
    }

    @Override
    public SubscriptionDto useOne(Long id) {
        Subscription sub = subRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
        if (sub.getUsedSessions() >= sub.getTotalSessions()) {
            throw new RuntimeException("No sessions left");
        }
        sub.setUsedSessions(sub.getUsedSessions() + 1);
        return mapper.toDto(subRepo.save(sub));
    }

    @Override
    public SubscriptionDto get(Long id) {
        Subscription entity = subRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
        return mapper.toDto(entity);
    }

    @Override
    public List<SubscriptionDto> getAll() {
        List<Subscription> subscriptions = subRepo.findAll();
        Set<Long> userIds = subscriptions.stream().map(subscription -> subscription.getStudent().getId()).collect(Collectors.toSet());

        List<StudentDto> studentDtos = studentService.getStudentsByIds(userIds);
        Map<Long, StudentDto> studentDtoMap = studentDtos.stream()
                .collect(Collectors.toMap(StudentDto::getId, dto -> dto));

        return subscriptions.stream().map(subscription -> {
            SubscriptionDto dto = mapper.toDto(subscription);
            dto.setStudent(studentDtoMap.get(subscription.getStudent().getId()));
            dto.setStudentId(subscription.getStudent().getId());
            return dto;
        }).toList();
    }

}
