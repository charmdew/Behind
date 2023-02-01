package com.reboot.behind.config.security.oauth.provider;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo{
    private Map<String, Object> attributes;
    public KakaoUserInfo(Map<String, Object> attributes){
        this.attributes = attributes;
    }

    @Override
    public String getId() {
        return "kakao"+String.valueOf(attributes.get("id"));
    }

    @Override
    public String getName() {
        return (String) ((Map<String,Object>)attributes.get("properties")).get("nickname");
    }

    @Override
    public String getEmail() {
        return (String)((Map<String,Object>)attributes.get("kakao_account")).get("email");
    }

    @Override
    public String getPhoneNum() {
        return null;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }
}
