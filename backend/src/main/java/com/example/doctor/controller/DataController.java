package com.example.doctor.controller;


import com.example.doctor.entity.DoctorSpecifiedData;
import com.example.doctor.entity.UserMediaDetails;
import com.example.doctor.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class DataController {

    private ReportService reportService;

    @Autowired
    public DataController(ReportService reportService){
        this.reportService = reportService;
    }

    @GetMapping("/details")
    public UserMediaDetails getImageData(){
        return reportService.getImageData();
    }

    @PostMapping("/report")
    public DoctorSpecifiedData createNewDoctorReport(@RequestBody DoctorSpecifiedData doctorSpecifiedData){
        return reportService.createNewReport(doctorSpecifiedData);
    }
}
