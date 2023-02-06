package com.reboot.behind.data.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class UserDto {
    private String userId;

    private String password;

    private String name;

    private String email;


    private String position;


    private Boolean showPhoneNum;

    private List<String> tag;

    private String phoneNum;

    private String images;

    private String track;










}
