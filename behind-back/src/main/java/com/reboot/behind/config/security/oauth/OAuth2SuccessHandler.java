package com.reboot.behind.config.security.oauth;

import com.reboot.behind.config.security.JwtTokenProvider;
import com.reboot.behind.config.security.auth.PrincipalDetails;
import com.reboot.behind.data.entity.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenProvider jwtTokenProvider;
    private final Logger LOGGER = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        String url = "https://i8a404.p.ssafy.io/";
        LOGGER.info("[onAuthenticationSuccess] url 생성 : {}", url);

        User user = ((PrincipalDetails)authentication.getPrincipal()).getUser();
        url += "?X-AUTH-TOKEN="+jwtTokenProvider.createToken(user.getId(), user.getRole(), false);
        String refreshToken = jwtTokenProvider.createToken(user.getId(), user.getRole(),true);
        Cookie cookie = new Cookie("behind_RefreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        jwtTokenProvider.saveRefreshToken(user.getId(), refreshToken);
        response.addCookie(cookie);
        LOGGER.info("[onAuthenticationSuccess] redirect 실행");
        getRedirectStrategy().sendRedirect(request, response, url);

    }
}
