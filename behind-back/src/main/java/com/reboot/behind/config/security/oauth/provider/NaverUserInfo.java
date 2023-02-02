package com.reboot.behind.config.security.oauth.provider;

import java.util.Map;

public class NaverUserInfo implements OAuth2UserInfo{

    private Map<String, Object> attributes;
    public NaverUserInfo(Map<String, Object> attributes){
        this.attributes = attributes;
    }

    @Override
    public String getId() {
        return (String) ((Map<String,Object>)attributes.get("response")).get("id");
    }

    @Override
    public String getName() {

        return (String) ((Map<String,Object>)attributes.get("response")).get("name");
    }

    @Override
    public String getEmail() {
        return (String) ((Map<String,Object>)attributes.get("response")).get("email");
    }

    @Override
    public String getPhoneNum() {

        return (String) ((Map<String,Object>)attributes.get("response")).get("mobile");
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }
}
