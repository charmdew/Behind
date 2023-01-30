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


    private int position1;

    private int position2;


    private List<String> tag;

    private String phoneNum;

    private Integer phoneBoolean;

    private int track1;


    private int track2;



}
