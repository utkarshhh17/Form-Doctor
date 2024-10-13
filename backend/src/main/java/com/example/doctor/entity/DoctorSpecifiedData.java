package com.example.doctor.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "doctor_specified_data")
public class DoctorSpecifiedData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "doctor_specified_data_id")
    private long doctorSpecifiedDataId;

    @JsonProperty(value = "doctorId")
    @Column(name = "doctor_id")
    private long doctorId;

    @JsonProperty(value = "userMediaDetailsId")
    @Column(name = "user_media_details_id")
    private long userMediaDetailsId;

    @JsonProperty(value = "reportData")
    @Column(name = "report_data")
    private String reportData;


    public DoctorSpecifiedData(long doctorSpecifiedDataId, long doctorId, long userMediaDetailsId, String reportData) {
        this.doctorSpecifiedDataId = doctorSpecifiedDataId;
        this.doctorId = doctorId;
        this.userMediaDetailsId = userMediaDetailsId;
        this.reportData = reportData;
    }

    public DoctorSpecifiedData() {

    }

    public long getDoctorReportId() {
        return doctorSpecifiedDataId;
    }

    public void setDoctorReportId(long doctorSpecifiedDataId) {
        this.doctorSpecifiedDataId = doctorSpecifiedDataId;
    }

    public long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(long doctorId) {
        this.doctorId = doctorId;
    }

    public long getUserMediaDetailsId() {
        return userMediaDetailsId;
    }

    public void setUserMediaDetailsId(long userMediaDetailsId) {
        this.userMediaDetailsId = userMediaDetailsId;
    }

    public String getReportData() {
        return reportData;
    }

    public void setReportData(String reportData) {
        this.reportData = reportData;
    }
}
