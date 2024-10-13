package com.example.doctor.repository;

import com.example.doctor.entity.DoctorSpecifiedData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorSpecifiedDataRepository extends JpaRepository<DoctorSpecifiedData, Long> {
    DoctorSpecifiedData findByUserMediaDetailsId(Long id);
}
