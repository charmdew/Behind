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
        private boolean frontend;
        private boolean backend;
        private boolean embedded;
    }
    @Getter
    @Setter
    @ToString
    public static class Track{
        private boolean ai ;
        private  boolean iot;
        private  boolean bigdata;
        private boolean blockchain;

        private boolean metabus;
    }
}