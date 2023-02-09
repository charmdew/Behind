package com.reboot.behind.service;

import com.reboot.behind.data.dto.*;
import com.reboot.behind.data.entity.User;

import java.util.List;

public interface UserService {

//    UserResponseDto saveUser(UserDto userDto);
    List<UserResponseDto> getUserList();

    List<UserResponseDto> getSearchUserList(int position,int track);

    UserResponseDto changeUser(UserResponseDto userResponseDto);

    UserResponseDto userDetail(Integer id);

    Integer saveFollower(FollowerDto followerDto);

    Integer deleteFollower(FollowerDto followerDto) throws Exception;

    UserResponseDto ChangeDetail(Integer id, String detail ) throws Exception;

    void deleteUser(Integer id) throws Exception;

    List<String> getUserImage(Integer id);

    void saveProfile(Integer id, String image);

    void saveImage(Integer id, String image);
}
