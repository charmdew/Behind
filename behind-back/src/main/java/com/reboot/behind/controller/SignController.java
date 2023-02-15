package com.reboot.behind.controller;

import com.reboot.behind.config.security.JwtTokenProvider;
import com.reboot.behind.config.security.auth.PrincipalDetails;
import com.reboot.behind.data.dto.User.UserResponseDto;
import com.reboot.behind.data.dto.User.UserUpdateDto;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@RestController
@Api(description = "회원 가입")
@RequestMapping("/signUp")
public class SignController {

    private final UserService userService;

    private final JwtTokenProvider jwtTokenProvider;

    public ResponseEntity<?> getUserInfo(@PathVariable int id){
        try {
            String name = SecurityContextHolder.getContext().getAuthentication().getName();
            PrincipalDetails principalDetails = (PrincipalDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user =principalDetails.getUser();
            UserResponseDto userDetail = userService.userDetail(id);

            return ResponseEntity.status(HttpStatus.OK).body(userDetail);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    public ResponseEntity<?> signUp(@RequestBody UserUpdateDto userUpdateDto, HttpServletResponse response){
        try{
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            if (tokenId == userUpdateDto.getId()) {
                UserResponseDto userChangeDto = userService.changeUser(userUpdateDto);
                String refreshToken = jwtTokenProvider.createToken(userChangeDto.getId(), userChangeDto.getRole(), true);
                String accessToken = jwtTokenProvider.createToken(userChangeDto.getId(), userChangeDto.getRole(), false);
                Cookie cookie = new Cookie("token", accessToken);
                response.addCookie(cookie);
                Cookie secureCookie = new Cookie("behind_RefreshToken", refreshToken);
                secureCookie.setHttpOnly(true);
                secureCookie.setSecure(true);
                secureCookie.setPath("/");
                response.addCookie(secureCookie);
                return ResponseEntity.status(HttpStatus.OK).body(userChangeDto);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }
}
