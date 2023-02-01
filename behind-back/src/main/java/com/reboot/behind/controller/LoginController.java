package com.reboot.behind.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {
    @GetMapping({"","/"})
    public @ResponseBody String index(){
        return "인덱스 페이지임동";
    }

    @GetMapping("/user")
    public @ResponseBody String user(){
        return "유저 페이지임동";
    }

    @GetMapping("/success")
    public @ResponseBody String success(){
        return "성공 페이지임동";
    }


    @GetMapping("/login")
    public @ResponseBody String login(){
        return "로그인 페이지임동";
    }
}
