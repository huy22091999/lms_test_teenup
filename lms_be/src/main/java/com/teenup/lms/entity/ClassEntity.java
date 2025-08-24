package com.teenup.lms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "classes")
public class ClassEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String subject;
    private String dayOfWeek;
    private String timeSlot;
    private String teacherName;
    private Integer maxStudents;

}