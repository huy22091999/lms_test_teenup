package com.teenup.lms.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "class_registrations")
@IdClass(ClassRegistrationId.class)
public class ClassRegistration {

    @Id
    @ManyToOne
    @JoinColumn(name = "class_id")
    private ClassEntity classEntity;

    @Id
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}