package com.teenup.lms.dto;

import com.teenup.lms.entity.Student;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParentDto {
    private Long id;
    private String name;
    private String phone;
    private String email;
}