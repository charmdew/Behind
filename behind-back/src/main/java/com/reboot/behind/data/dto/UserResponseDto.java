package com.reboot.behind.data.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class UserResponseDto {

    private int id;

    private String userId;

    private String name;


    private String email;


    private String position;

    private String phoneNum;

    private Boolean showPhoneNum;
    private List<String> tag;


    private String track;




    private String detail;

    private String images;

    private String profile;

    private List<Integer> followingUsers;

    private List<Integer> followedUsers;
}
