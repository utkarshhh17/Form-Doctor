package com.example.doctor.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "user_media_details")
public class UserMediaDetails {
    @Id
    @Column(name = "user_media_details_id")
    private long userMediaDetailsId;

    @Column(name = "user_id")
    private long userId;

    @Column(name = "video_file")
    private String videoFile;

    @Column(name = "video_s3_url")
    private String videoS3Path;

    @Column(name = "image_file")
    private String imageFile;

    @Column(name = "image_s3_path")
    private String imageS3Path;

    @Column(name = "session")
    private String session;

    @Column(name = "promocode")
    private String promocode;

    @Column(name = "latitude")
    private float latitude;

    @Column(name = "longitude")
    private float longitude;



    public UserMediaDetails(long userId, String videoFile, String videoS3Path, String imageFile, String imageS3Path, String session, String promocode, float latitude, float longitude) {
        this.userId = userId;
        this.videoFile = videoFile;
        this.videoS3Path = videoS3Path;
        this.imageFile = imageFile;
        this.imageS3Path = imageS3Path;
        this.session = session;
        this.promocode = promocode;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public UserMediaDetails() {

    }

    public long getUserMediaDetailsId() {
        return userMediaDetailsId;
    }

    public void setUserMediaDetailsId(long userMediaDetailsId) {
        this.userMediaDetailsId = userMediaDetailsId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getVideoFile() {
        return videoFile;
    }

    public void setVideoFile(String videoFile) {
        this.videoFile = videoFile;
    }

    public String getVideoS3Path() {
        return videoS3Path;
    }

    public void setVideoS3Path(String videoS3Path) {
        this.videoS3Path = videoS3Path;
    }

    public String getImageFile() {
        return imageFile;
    }

    public void setImageFile(String imageFile) {
        this.imageFile = imageFile;
    }

    public String getImageS3Path() {
        return imageS3Path;
    }

    public void setImageS3Path(String imageS3Path) {
        this.imageS3Path = imageS3Path;
    }

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public String getPromocode() {
        return promocode;
    }

    public void setPromocode(String promocode) {
        this.promocode = promocode;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }
}
