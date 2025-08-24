package com.teenup.lms.repository;

import com.teenup.lms.entity.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassRepository extends JpaRepository<ClassEntity, Long> {
    List<ClassEntity> findByDayOfWeek(String dayOfWeek);
}