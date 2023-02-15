package com.reboot.behind.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reboot.behind.data.dto.SecurityErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final Logger LOGGER = LoggerFactory.getLogger(CustomAccessDeniedHandler.class);
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
       
        ObjectMapper objectMapper = new ObjectMapper();
        LOGGER.info("[handle] 미인가 접근 처리");

        SecurityErrorResponse securityErrorResponse = new SecurityErrorResponse();
        securityErrorResponse.setMsg("인증이 실패하였습니다.");

        response.setStatus(401);
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(objectMapper.writeValueAsString(securityErrorResponse));//json 형식의 string으로 객체를 변환하여 전송

    }
}
