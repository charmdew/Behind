package com.reboot.behind.config.security;

import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.UserRepository;
import com.reboot.behind.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider){
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwtTokenProvider.resolveToken(request);
        LOGGER.info("[doFilterInternal] token 값 추출 완료. token : {}", token);

        LOGGER.info("[doFilterInternal] token 값 유효성 체크 시작");
        if(token != null){
            int validationStatus = jwtTokenProvider.validateToken(token); // 0: invalid 1: valid 2: expired
            if(validationStatus == 1){
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                LOGGER.info("[doFilterInternal] token 값 유효성 체크 완료");
            }else if(validationStatus == 2){
                Cookie[] cookies = request.getCookies();
                String refreshToken = "";
                User user = userRepository.getUserByUserId(jwtTokenProvider.getId(token));
                for(Cookie cookie : cookies){
                    if(cookie.getName() == "behind_RefreshToken"){
                        refreshToken = cookie.getValue();
                        break;
                    }
                }
                if(jwtTokenProvider.validateToken(refreshToken) == 1 && user.getRefreshToken()==refreshToken){
                    Cookie cookie = new Cookie("token", jwtTokenProvider.createToken(user.getId(), user.getRole(),false));
                    response.addCookie(cookie);
                }
            }
        }

        LOGGER.info("[doFilterInternal] token 값 유효성 체크 끝");

        filterChain.doFilter(request, response);
    }
}
