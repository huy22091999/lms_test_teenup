package com.teenup.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatisticsDto {
    private Long totalStudents;
    private Long totalParents;
    private Long totalClasses;
    private Long totalSubscriptions;
}