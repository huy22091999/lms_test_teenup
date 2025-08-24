package com.teenup.lms.service.impl;


import com.teenup.lms.dto.StatisticsDto;
import com.teenup.lms.repository.ClassRepository;
import com.teenup.lms.repository.ParentRepository;
import com.teenup.lms.repository.StudentRepository;
import com.teenup.lms.repository.SubscriptionRepository;
import com.teenup.lms.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final StudentRepository studentRepository;
    private final ParentRepository parentRepository;
    private final ClassRepository classRepository;
    private final SubscriptionRepository subscriptionRepository;

    @Override
    public StatisticsDto getStatistics() {
        return new StatisticsDto(
                studentRepository.count(),
                parentRepository.count(),
                classRepository.count(),
                subscriptionRepository.count()
        );
    }

}