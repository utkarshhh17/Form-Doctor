package com.example.doctor.service;

import com.example.doctor.dto.LoginDTO;
import com.example.doctor.entity.DoctorPrinciple;
import com.example.doctor.entity.UserMediaDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;


    public String verifyDoctor(LoginDTO loginDTO){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        if(authentication.isAuthenticated()){
            DoctorPrinciple doctorPrinciple = (DoctorPrinciple) authentication.getPrincipal();
            Long userId = doctorPrinciple.getId(); // Fetch the user ID

            // Generate the token with both email and user ID
            return jwtService.generateToken(loginDTO.getEmail(), userId);
        } else {
            return "Failure";
        }
    }
}
