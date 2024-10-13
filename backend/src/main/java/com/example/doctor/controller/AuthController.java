package com.example.doctor.controller;

import com.example.doctor.dto.LoginDTO;
import com.example.doctor.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/hello")
    public String hello(){
        return "Hello";
    }

    @GetMapping("/home")
    public String home(){
        return "Home";
    }


    @PostMapping("/login")
    public String login(@RequestBody LoginDTO loginDTO){
        return authService.verifyDoctor(loginDTO);
    }
}
