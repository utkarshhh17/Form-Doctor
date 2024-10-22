package com.example.doctor.controller;


import com.example.doctor.entity.Doctor;
import com.example.doctor.entity.DoctorSpecifiedData;
import com.example.doctor.entity.UserMediaDetails;
import com.example.doctor.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DataController {

    private ReportService reportService;

    @Autowired
    public DataController(ReportService reportService){
        this.reportService = reportService;
    }

    @GetMapping("/details")
    public ResponseEntity<?> getImageData(){

         UserMediaDetails userMediaDetails = reportService.getImageData();
         if(userMediaDetails==null){
             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
         } else {
             return new ResponseEntity<>(userMediaDetails, HttpStatus.OK);
         }
    }

    @PostMapping("/report")
    public ResponseEntity<DoctorSpecifiedData> createNewDoctorReport(@RequestBody DoctorSpecifiedData doctorSpecifiedData){
        DoctorSpecifiedData data = reportService.createNewReport(doctorSpecifiedData);
        if(data==null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
