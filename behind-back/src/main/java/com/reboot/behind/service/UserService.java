package com.reboot.behind.service;

import com.reboot.behind.data.dto.User.*;
import com.reboot.behind.data.entity.User;

import java.util.List;

public interface UserService {

    List<UserResponseDto> getSearchUserList(int position,int track,int page,int volume);

    UserResponseDto changeUser(UserUpdateDto userUpdateDto);

    UserResponseDto userDetail(Integer id);

    Integer saveFollower(FollowerDto followerDto);

    Integer deleteFollower(FollowerDto followerDto) throws Exception;

    UserResponseDto ChangeDetail(Integer id, String detail ) throws Exception;

    void deleteUser(Integer id) throws Exception;

    void saveProfile(Integer id, String image);

    void saveImage(Integer id, String image);

    List<UserResponseDto> getFollowingUser(int id);

    List<UserResponseDto> getFollowedUser(int id);

    void saveRefreshToken(Integer id, String refreshToken);

    String getUserRefreshToken(int id);
}
