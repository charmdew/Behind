package com.reboot.behind.data.dto.User;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FollowerDto {

    private int user;
    private int followUser;
}
