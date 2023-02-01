package com.reboot.behind.config.security.oauth.provider;

import java.util.Map;

public interface OAuth2UserInfo {

    String getId();

    String getName();
    String getEmail();
    String getPhoneNum();
    Map<String,Object> getAttributes();
}
