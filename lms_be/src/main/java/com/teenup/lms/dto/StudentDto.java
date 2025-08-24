package com.teenup.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto {
    private Long id;
    private String name;
    private LocalDate dob;
    private String gender;
    private String currentGrade;
    private ParentDto parent;
}
