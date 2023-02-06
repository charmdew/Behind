package com.reboot.behind.data.controller;

import com.reboot.behind.service.S3Uploader;
import com.reboot.behind.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController("/images")
public class ImageController {
    private final S3Uploader s3Uploader;
    private final UserService userService;
    @PostMapping
    public String upload(MultipartFile multipartFile) throws IOException {
        String id = SecurityContextHolder.getContext().getAuthentication().getName();

        String fileName = s3Uploader.uploadImage(multipartFile, id);

        return fileName;
    }
    @DeleteMapping
    public void delete(String fileName) throws IOException {
        s3Uploader.deleteImage(fileName);
    }

}