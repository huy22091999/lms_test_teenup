package com.teenup.lms.repository;

import com.teenup.lms.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {


}