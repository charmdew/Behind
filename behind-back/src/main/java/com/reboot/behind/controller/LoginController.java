package com.reboot.behind.controller;

import com.reboot.behind.config.security.JwtTokenProvider;
import com.reboot.behind.config.security.auth.PrincipalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@Controller
public class LoginController {
    @GetMapping({"", "/"})
    public @ResponseBody String index() {
        return "인덱스 페이지임동";
    }

    @GetMapping("/user")
    public @ResponseBody String user() {
        String info = SecurityContextHolder.getContext().getAuthentication().getName();
        PrincipalDetails principal = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String info2 = principal.getUsername();
        String info3 = principal.getPassword();
        String info4 = principal.getName();

        return info+"\n"+info2+"\n"+info3+"\n"+info4;
    }

    @GetMapping("/success")
    public @ResponseBody String success() {
        return "성공 페이지임동";
    }


    @GetMapping("/login")
    public @ResponseBody String login() {
        return "로그인 페이지임동";
    }
}
