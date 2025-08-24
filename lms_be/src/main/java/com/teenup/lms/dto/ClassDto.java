package com.teenup.lms.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ClassDto {
    private Long id;

    private String name;
    private String subject;
    private String dayOfWeek;
    private String timeSlot;
    private String teacherName;
    private Integer maxStudents;

    private List<ClassRegistrationDto> registrations;
}