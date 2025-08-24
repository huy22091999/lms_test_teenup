package com.teenup.lms.service.mapper;

import com.teenup.lms.dto.StudentDto;
import com.teenup.lms.entity.Student;
import org.mapstruct.Mapper;
@Mapper(componentModel = "spring")
public interface StudentMapper {
    StudentDto toDto(Student dto);

    Student toEntity(StudentDto dto);
}
