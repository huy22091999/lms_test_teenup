package com.teenup.lms.service.mapper;

import com.teenup.lms.dto.SubscriptionDto;
import com.teenup.lms.entity.Subscription;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubscriptionMapper {
    SubscriptionDto toDto(Subscription dto);

    Subscription toEntity(SubscriptionDto dto);
}
