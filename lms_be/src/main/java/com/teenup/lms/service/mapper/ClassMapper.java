package com.teenup.lms.service.mapper;

import com.teenup.lms.dto.ClassDto;
import com.teenup.lms.dto.StudentDto;
import com.teenup.lms.entity.ClassEntity;
import com.teenup.lms.entity.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClassMapper {
    ClassDto toDto(ClassEntity dto);

    ClassEntity toEntity(ClassDto dto);
}
