package com.reboot.behind.service;

import com.reboot.behind.data.dto.*;
import com.reboot.behind.data.entity.User;

import java.util.List;

public interface UserService {

    UserResponseDto saveUser(UserDto userDto);
    List<UserResponseDto> getUserList();

    UserResponseDto changeUser(UserResponseDto userResponseDto);

    UserResponseDto userDetail(Integer id);

    FollowerResponseDto saveFollower(FollowerDto followerDto);

    void deleteFollower(FollowerDto followerDto) throws Exception;

    UserResponseDto ChangeDetail(Integer id, String detail ) throws Exception;

}
