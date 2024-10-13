package com.example.doctor.service;



import com.example.doctor.entity.DoctorSpecifiedData;
import com.example.doctor.entity.UserMediaDetails;
import com.example.doctor.repository.DoctorSpecifiedDataRepository;
import com.example.doctor.repository.UserMediaDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private UserMediaDetailsRepository userMediaDetailsRepository;
    private DoctorSpecifiedDataRepository doctorSpecifiedDataRepository;

    @Autowired
    public ReportService(UserMediaDetailsRepository userMediaDetailsRepository, DoctorSpecifiedDataRepository doctorSpecifiedDataRepository) {
        this.userMediaDetailsRepository = userMediaDetailsRepository;
        this.doctorSpecifiedDataRepository = doctorSpecifiedDataRepository;
    }



    public UserMediaDetails getImageData() {
        List<UserMediaDetails> list = userMediaDetailsRepository.findAll();
        for (UserMediaDetails i : list) {
            if(checkReportAlreadyExists(i.getUserMediaDetailsId())){
                continue;
            } else {
                return i;
            }
        }
        return null;
    }


    public DoctorSpecifiedData createNewReport(DoctorSpecifiedData doctorSpecifiedData){
        return doctorSpecifiedDataRepository.save(doctorSpecifiedData);
    }

    private boolean checkReportAlreadyExists(Long userMediaDetailsId){
        DoctorSpecifiedData d = doctorSpecifiedDataRepository.findByUserMediaDetailsId(userMediaDetailsId);
        if(d==null){
            return false;
        } else {
            return true;
        }
    }


}
