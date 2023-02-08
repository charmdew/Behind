//자체 로그인, 회원가입은 서비스에 사용되지 않는다.

package com.reboot.behind.controller;

import com.reboot.behind.data.dto.SignInRequestDto;
import com.reboot.behind.data.dto.SignInResultDto;
import com.reboot.behind.data.dto.SignUpRequestDto;
import com.reboot.behind.data.dto.SignUpResultDto;
import com.reboot.behind.service.SignService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sign")
public class SignController {

    private final Logger LOGGER = LoggerFactory.getLogger(SignController.class);
    private final SignService signService;

    @Autowired
    public SignController(SignService signService){
        this.signService = signService;
    }

    @ApiOperation(
            value = "회원 가입"
            , notes = "회원 가입을 합니다")
    @PostMapping("/in")
    public ResponseEntity<SignInResultDto> signIn(@RequestBody SignInRequestDto signInRequestDto) throws  RuntimeException{
        LOGGER.info("[signIn] 로그인 시도 중 id : {}, pw : ****", signInRequestDto.getId() );
        SignInResultDto signInResultDto= signService.signIn(signInRequestDto);

        if(signInResultDto.getCode() == 0){
            LOGGER.info("[signIn] 정상적으로 로그인되었습니다. id : {}, token : {}",
                    signInRequestDto.getId(),
                    signInResultDto.getToken());
        }
        return ResponseEntity.status(HttpStatus.OK).body(signInResultDto);

    }

    @ApiOperation(
            value = "로그인"
            , notes = "로그인을 합니다")
    @PostMapping(value = "/up")
    public ResponseEntity<SignUpResultDto> signUp(@RequestBody SignUpRequestDto signUpRequestDto) {
        LOGGER.info("[signUp] 회원가입을 수행합니다. id : {}, password : ****, name : {}",
                signUpRequestDto.getId(), signUpRequestDto.getName());
        SignUpResultDto signUpResultDto = signService.signUp(signUpRequestDto);

        LOGGER.info("[signUp] 회원가입을 완료했습니다. id : {}", signUpRequestDto.getId());

        return ResponseEntity.status(HttpStatus.OK).body(signUpResultDto);
    }
}
