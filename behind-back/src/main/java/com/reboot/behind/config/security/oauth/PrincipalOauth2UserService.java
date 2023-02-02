package com.reboot.behind.config.security.oauth;

import com.reboot.behind.config.security.auth.PrincipalDetails;
import com.reboot.behind.config.security.oauth.provider.GoogleUserInfo;
import com.reboot.behind.config.security.oauth.provider.KakaoUserInfo;
import com.reboot.behind.config.security.oauth.provider.NaverUserInfo;
import com.reboot.behind.config.security.oauth.provider.OAuth2UserInfo;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.awt.*;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private UserRepository userRepository;

    private final Logger LOGGER = LoggerFactory.getLogger(PrincipalOauth2UserService.class);

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        LOGGER.info("[loadUser] 유저를 로드 시작");
        OAuth2User oAuth2User = super.loadUser(userRequest);


        return processOAuth2User(userRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        LOGGER.info("[processOAuth2User] 유저 정보 프로세싱");
        System.out.println(oAuth2User.getAttributes());

        OAuth2UserInfo oAuth2UserInfo = null;
        String provider = userRequest.getClientRegistration().getRegistrationId();

        switch (provider) {
            case "google":
                oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
                break;

            case "kakao":
                oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
                break;

            case "naver":
                oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
                break;
        }
        if (oAuth2UserInfo == null) throw new RuntimeException("네이버, 카카오, 구글 로그인을 지원합니다.");

        User user = userRepository.getUserByUserId(oAuth2UserInfo.getId());

        if (user == null) {
            System.out.println("유저 정보 저장하자");
            user = User.builder()
                    .userId(oAuth2UserInfo.getId())
                    .name(oAuth2UserInfo.getName())
                    .email(oAuth2UserInfo.getEmail())
                    .phoneNum(oAuth2UserInfo.getPhoneNum())
                    .role("TEMP")
                    .build();
            userRepository.save(user);
        }

        return new PrincipalDetails(user, oAuth2UserInfo.getAttributes());
    }
}
