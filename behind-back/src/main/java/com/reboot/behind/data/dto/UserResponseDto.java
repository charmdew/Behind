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


    private int position1;

    private int position2;

    private String phoneNum;
    private List<String> tag;


    private int track1;


    private int track2;

    private String detail;

    private String images;

    private String profile;

    private List<Integer> followUsers;
}
