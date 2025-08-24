package com.teenup.lms.entity;


import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassRegistrationId implements Serializable {
    private Long classEntity;
    private Long student;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ClassRegistrationId)) return false;
        ClassRegistrationId that = (ClassRegistrationId) o;
        return Objects.equals(classEntity, that.classEntity) &&
                Objects.equals(student, that.student);
    }

    @Override
    public int hashCode() {
        return Objects.hash(classEntity, student);
    }
}