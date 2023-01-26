package com.reboot.behind.service;

import com.reboot.behind.data.dto.SignInRequestDto;
import com.reboot.behind.data.dto.SignInResultDto;
import com.reboot.behind.data.dto.SignUpRequestDto;
import com.reboot.behind.data.dto.SignUpResultDto;

public interface SignService {

    SignUpResultDto signUp(SignUpRequestDto signUpRequestDto);

    SignInResultDto signIn(SignInRequestDto signInRequestDto) throws RuntimeException;
}
