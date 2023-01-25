package com.reboot.behind.service;

import com.reboot.behind.data.dto.SignInResultDto;
import com.reboot.behind.data.dto.SignUpResultDto;

public interface SignService {

    SignUpResultDto signUp(String id, String password, String name, String role);

    SignInResultDto signIn(String id, String password) throws RuntimeException;
}
