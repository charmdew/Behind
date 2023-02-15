package com.reboot.behind.data.dto.User;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class UserUpdateDto {
    private int id;

    private String name;


    private String email;


    private UserUpdateDto.Position position;

    private String phoneNum;


    private Boolean showPhoneNum;


    private List<String> tag;

    private UserUpdateDto.Track track;

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
        private boolean nonMajor;
    }

    @Builder
    public UserUpdateDto(int id, String name, String email, UserUpdateDto.Position position, String phoneNum, boolean showPhoneNum, List<String> tag, UserUpdateDto.Track track){
        this.id = id;
        this.name = name;
        this.email = email;
        this.position=position;
        this.phoneNum=phoneNum;
        this.showPhoneNum=showPhoneNum;
        this.tag=tag;
        this.track=track;
    }

}
