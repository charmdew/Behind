package com.reboot.behind.data.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.security.PrivateKey;
import java.util.List;

@Getter
@Setter
@ToString
public class UserResponseDto {

    private int id;

    private String userId;

    private String name;


    private String email;


    private Position position;

    private String phoneNum;


    private Boolean showPhoneNum;


    private List<String> tag;


    private Track track;


    private String detail;

    private String images;

    private String profile;

    private List<Integer> followingUsers;

    private List<Integer> followedUsers;

    private int likeCnt;

    @Getter
    @Setter
    @ToString
    public static class Position{
        private String FRONTEND;
        private String BACKEND;
        private String EMBEDED;
    }
    @Getter
    @Setter
    @ToString
    public static class Track{
        private String AI ;
        private  String IOT;
        private  String BIGDATA;
        private String BLOCKCHAIN;
    }
}
