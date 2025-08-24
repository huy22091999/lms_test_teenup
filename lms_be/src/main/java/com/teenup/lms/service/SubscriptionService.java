package com.teenup.lms.service;

import com.teenup.lms.dto.SubscriptionDto;
import com.teenup.lms.entity.Subscription;

import java.util.List;

public interface SubscriptionService {
    SubscriptionDto create(SubscriptionDto subscription);

    SubscriptionDto useOne(Long id);

    SubscriptionDto get(Long id);

    List<SubscriptionDto> getAll();
}
