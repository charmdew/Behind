package com.reboot.behind.config.security.oauth.provider;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo{
    private Map<String, Object> attributes;
    public KakaoUserInfo(Map<String, Object> attributes){
        this.attributes = attributes;
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
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
