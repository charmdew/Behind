package com.reboot.behind.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginController {
    @GetMapping({"", "/"})
    public @ResponseBody ResponseEntity<String> index() {

        return ResponseEntity.status(HttpStatus.OK).body("인덱스 페이지 임동");
    }

    @GetMapping("/user")
    public @ResponseBody ResponseEntity<String> user(HttpServletRequest request) {

        return ResponseEntity.status(HttpStatus.OK).body("유저페이지임당");
    }

    @GetMapping("/success")
    public @ResponseBody ResponseEntity<String> success() {

        return ResponseEntity.status(HttpStatus.OK).body("성공 페이지임동");
    }


    @GetMapping("/login")
    public @ResponseBody ResponseEntity<String> login() {
        return ResponseEntity.status(HttpStatus.OK).body("로그인 페이지임동");
    }
}
