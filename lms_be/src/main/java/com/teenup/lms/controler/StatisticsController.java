package com.teenup.lms.controler;

import com.teenup.lms.dto.StatisticsDto;
import com.teenup.lms.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping
    public StatisticsDto getStatistics() {
        return statisticsService.getStatistics();
    }
}
