package com.teenup.lms.service.impl;

import com.teenup.lms.dto.ParentDto;
import com.teenup.lms.entity.Parent;
import com.teenup.lms.repository.ParentRepository;
import com.teenup.lms.service.ParentService;
import com.teenup.lms.service.mapper.ParentMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ParentServiceImpl implements ParentService {

    private final ParentRepository repo;
    private final ParentMapper parentMapper;

    @Override
    public ParentDto create(ParentDto parent) {
        Parent entity = parentMapper.toEntity(parent);
        return parentMapper.toDto(repo.save(entity));
    }

    @Override
    public ParentDto getById(Long id) {
        return parentMapper.toDto(repo.findById(id).orElse(null));
    }

    @Override
    public List<ParentDto> getAll() {
        return repo.findAll().stream().map(parentMapper::toDto).collect(Collectors.toList());
    }

}

