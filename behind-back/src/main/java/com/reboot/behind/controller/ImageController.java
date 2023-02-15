package com.reboot.behind.controller;

import com.reboot.behind.config.security.auth.PrincipalDetails;
import com.reboot.behind.service.impl.S3Uploader;
import com.reboot.behind.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/images")
public class ImageController {
    private final S3Uploader s3Uploader;
    private final UserService userService;

    @ApiOperation(
            value = "이미지 업로드"
            , notes = "이미지를 S3에 업로드 합니다")
    @PostMapping()
    public ResponseEntity<String> upload(MultipartFile multipartFile) throws IOException {
        try {
            String id = SecurityContextHolder.getContext().getAuthentication().getName();
            String fileName = s3Uploader.uploadImage(multipartFile, id);
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenid = pd.getUser().getId();
            // user에 넣는거 추가
            userService.saveImage(tokenid, fileName);
            userService.saveProfile(tokenid, fileName);
            return ResponseEntity.status(HttpStatus.OK).body("사진 등록 완료!");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    @ApiOperation(
            value = "아직 미구현"
            , notes = "구현 해야함")
    @DeleteMapping()
    public void delete(String fileName) throws IOException {
        PrincipalDetails pd = (PrincipalDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        int tokenid = pd.getUser().getId();
        // 유저 목록 가서 사진 제거 해야함
        s3Uploader.deleteImage(fileName);

    }

}