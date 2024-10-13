package com.example.doctor.service;

import com.example.doctor.entity.Doctor;
import com.example.doctor.entity.DoctorPrinciple;
import com.example.doctor.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class AuthDoctorDetailsService implements UserDetailsService {

    @Autowired
    private AuthRepository authRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Doctor doctor = authRepository.getDoctorByEmail(email);
        if(doctor==null){
            throw new UsernameNotFoundException("User not found");
        }
        return new DoctorPrinciple(doctor);
    }
}
