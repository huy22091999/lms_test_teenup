package com.teenup.lms.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate dob;
    private String gender;
    private String currentGrade;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent;
}