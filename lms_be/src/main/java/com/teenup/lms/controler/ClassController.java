package com.teenup.lms.controler;

import com.teenup.lms.dto.ClassDto;
import com.teenup.lms.entity.ClassEntity;
import com.teenup.lms.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
@RequiredArgsConstructor
public class ClassController {

    private final ClassService classService;

    @PostMapping
    public ResponseEntity<ClassDto> createClass(@RequestBody ClassDto c) {
        return ResponseEntity.ok(classService.create(c));
    }

    @GetMapping
    public ResponseEntity<List<ClassDto>> getClassesByDay(@RequestParam(name = "day", required = false) String day) {
        if(day == null) {
            return ResponseEntity.ok(classService.getAll());
        }
        return ResponseEntity.ok(classService.getByDay(day));
    }

}