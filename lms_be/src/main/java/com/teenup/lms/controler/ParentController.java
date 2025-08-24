package com.teenup.lms.controler;
import com.teenup.lms.dto.ParentDto;
import com.teenup.lms.entity.Parent;
import com.teenup.lms.service.ParentService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parents")
@RequiredArgsConstructor
public class ParentController {
    private final ParentService service;

    @PostMapping
    public ResponseEntity<ParentDto> create(@RequestBody ParentDto p) {
        return ResponseEntity.ok(service.create(p));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParentDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping()
    public ResponseEntity<List<ParentDto>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

}