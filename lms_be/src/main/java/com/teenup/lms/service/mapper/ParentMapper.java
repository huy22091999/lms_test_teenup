package com.teenup.lms.service.mapper;

import com.teenup.lms.dto.ParentDto;
import com.teenup.lms.dto.StudentDto;
import com.teenup.lms.entity.Parent;
import com.teenup.lms.entity.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ParentMapper {
    ParentDto toDto(Parent dto);

    Parent toEntity(ParentDto dto);
}
