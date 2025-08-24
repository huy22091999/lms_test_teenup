package com.teenup.lms.service;

import com.teenup.lms.dto.ParentDto;
import com.teenup.lms.entity.Parent;

import java.util.List;
import java.util.Optional;

public interface ParentService {
    ParentDto create(ParentDto parent);
    ParentDto getById(Long id);

    List<ParentDto> getAll();
}
