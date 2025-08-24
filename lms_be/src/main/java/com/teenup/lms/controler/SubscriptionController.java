package com.teenup.lms.controler;

import com.teenup.lms.dto.SubscriptionDto;
import com.teenup.lms.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {
    private final SubscriptionService subService;

    @PostMapping
    public ResponseEntity<SubscriptionDto> create(@RequestBody SubscriptionDto sub) {
        return ResponseEntity.ok(subService.create(sub));
    }

    @PatchMapping("/{id}/use")
    public ResponseEntity<SubscriptionDto> use(@PathVariable Long id) {
        return ResponseEntity.ok(subService.useOne(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(subService.get(id));
    }

    @GetMapping
    public ResponseEntity<List<SubscriptionDto>> getAll() {
        return ResponseEntity.ok(subService.getAll());
    }
}