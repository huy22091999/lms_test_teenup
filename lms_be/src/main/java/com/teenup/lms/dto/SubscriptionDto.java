package com.teenup.lms.dto;

import com.teenup.lms.entity.Student;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDto {

    private Long id;
    private Long studentId;
    private StudentDto student;
    private String packageName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer totalSessions;
    private Integer usedSessions;
}