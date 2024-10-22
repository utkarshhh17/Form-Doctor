package com.example.doctor.service;


import com.example.doctor.entity.Doctor;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private String key = "sdljfnvsdjsadkbvkjasdnvjkdsnvkjdsdsvdsjvsdvdsjkdsafkdsnvjksadnbvkjasdnfajk";



    public String generateToken(String email, Long id) {

        Map<String, Object> claim = new HashMap<>();
        claim.put("doctorId", id);


        return Jwts
                .builder()
                .claims()
                .add(claim)
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000 * 60*60*30))
                .and()
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        byte[] bytes = Decoders.BASE64.decode(this.key);
        return Keys.hmacShaKeyFor(bytes);
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

//    public Long extractDoctorId(String token) {
//        return extractClaim(token, claims -> (Long) claims.get("doctorId"));
//    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, Doctor doctor) {
        final String email = extractEmail(token);
        return (email.equals(doctor.getEmail()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
