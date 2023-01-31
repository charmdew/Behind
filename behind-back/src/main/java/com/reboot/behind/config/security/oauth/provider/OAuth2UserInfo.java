package com.reboot.behind.config.security.oauth.provider;

public interface OAuth2UserInfo {

    String getId();

    String getName();
    String getEmail();
    String getPhoneNum();
}
