package com.reboot.behind.data.dto.User;

import lombok.Builder;
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

    private String role;


    private Boolean showPhoneNum;


    private List<String> tag;


    private Track track;


    private String detail;

    private List<String> images;

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
        private boolean major ;
        private  boolean nonMajor;
    }

    public UserResponseDto(){

    }

    @Builder
    public UserResponseDto(int id, String userId,String name,String email, Position position,String phoneNum, boolean showPhoneNum, List<String> tag, Track track,String detail, List<String> images,String profile,List<Integer> followingUsers,List<Integer> followedUsers,int likeCnt,String role){
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.position=position;
        this.phoneNum=phoneNum;
        this.showPhoneNum=showPhoneNum;
        this.tag=tag;
        this.track=track;
        this.detail=detail;
        this.images=images;
        this.profile=profile;
        this.followingUsers=followingUsers;
        this.followedUsers=followedUsers;
        this.likeCnt=likeCnt;
        this.role=role;
    }
}
