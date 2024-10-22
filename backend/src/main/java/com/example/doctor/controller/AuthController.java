package com.example.doctor.controller;

import com.example.doctor.dto.LoginDTO;
import com.example.doctor.entity.Doctor;
import com.example.doctor.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/hello")
    public String hello(){
        return "Hello";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDTO loginDTO){
        return authService.verifyDoctor(loginDTO);
    }
}
