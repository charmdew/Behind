package com.reboot.behind.service.impl;

import com.reboot.behind.data.dto.*;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.UserRepository;
import com.reboot.behind.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository=userRepository;
    }



    public List<UserResponseDto> getUserList(){
//        List<User> userlist = userRepository.findAll();
//        List<UserResponseDto> userResponseDtoList = new ArrayList<>();
//        int i;
//        for(i=0;i<userlist.size();i++){
//            System.out.println(userlist.get(i));
//            System.out.println("호호호호호호호");
//            UserResponseDto userResponseDto = new UserResponseDto();
//            userResponseDto.setId(userlist.get(i).getId());
//            userResponseDto.setUserId(userlist.get(i).getUserId());
//            userResponseDto.setName(userlist.get(i).getName());
//            userResponseDto.setEmail(userlist.get(i).getEmail());
//            userResponseDto.setPosition1(userlist.get(i).getPosition1());
//            userResponseDto.setPosition2(userlist.get(i).getPosition2());
//            userResponseDto.setTag(userlist.get(i).getTag());
//            userResponseDto.setTrack1(userlist.get(i).getTrack1());
//            userResponseDto.setTrack2(userlist.get(i).getTrack2());
//            userResponseDto.setDetail(userlist.get(i).getDetail());
//            userResponseDto.setPhoneNum(userlist.get(i).getPhoneNum());
//            userResponseDto.setFollowUsers(userlist.get(i).getFollowUsers());
//            System.out.println(userResponseDto);
//            userResponseDtoList.add(userResponseDto);
//        }
//        System.out.println(userResponseDtoList);
//        return userResponseDtoList;
        List<UserResponseDto> userResponseDtoList = new ArrayList<>();
        UserResponseDto userResponseDto = new UserResponseDto();

        userResponseDtoList.add();

    }
    @Override
    public UserResponseDto saveUser(UserDto userDto){
        User user = new User();
        user.setUserId(userDto.getUserId());
        user.setName(userDto.getName());
        user.setPassword(userDto.getPassword());
        user.setEmail(userDto.getEmail());
        user.setPosition1(userDto.getPosition1());
        user.setPosition2(userDto.getPosition2());
        user.setTag(userDto.getTag());
        user.setTrack1(userDto.getTrack1());
        user.setTrack2(userDto.getTrack2());
        user.setDetail(userDto.getDetail());
        user.setPhoneNum(userDto.getPhoneNum());

        User saveUser = userRepository.save(user);

        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setId(saveUser.getId());
        userResponseDto.setUserId(saveUser.getUserId());
        userResponseDto.setName(saveUser.getName());
        userResponseDto.setEmail(saveUser.getEmail());
        userResponseDto.setPosition1(saveUser.getPosition1());
        userResponseDto.setPosition2(saveUser.getPosition2());
        userResponseDto.setTag(saveUser.getTag());
        userResponseDto.setTrack1(saveUser.getTrack1());
        userResponseDto.setTrack2(saveUser.getTrack2());
        userResponseDto.setDetail(saveUser.getDetail());
        userResponseDto.setPhoneNum(saveUser.getPhoneNum());
        return userResponseDto;
    }
    public UserResponseDto changeUser(UserResponseDto userResponseDto){
        User foundUser = userRepository.findById(userResponseDto.getId()).get();
        foundUser.setName(userResponseDto.getName());
        foundUser.setEmail(userResponseDto.getEmail());
        foundUser.setPhoneNum(userResponseDto.getPhoneNum());
        foundUser.setPosition1(userResponseDto.getPosition1());
        foundUser.setPosition2(userResponseDto.getPosition2());
        foundUser.setTag(userResponseDto.getTag());
        foundUser.setTrack1(userResponseDto.getTrack1());
        foundUser.setTrack2(userResponseDto.getTrack2());
//        foundUser.setDetail(userResponseDto.getDetail());
//        foundUser.setImages(userResponseDto.getImages());
//        foundUser.setProfile(userResponseDto.getProfile());


        User changedUser = userRepository.save(foundUser);

        UserResponseDto userResponseDto2 = new UserResponseDto();

        userResponseDto2.setId(changedUser.getId());
        userResponseDto2.setUserId(changedUser.getUserId());
        userResponseDto2.setName(changedUser.getName());
        userResponseDto2.setEmail(changedUser.getEmail());
        userResponseDto2.setPosition1(changedUser.getPosition1());
        userResponseDto2.setPosition2(changedUser.getPosition2());
        userResponseDto2.setTag(changedUser.getTag());
        userResponseDto2.setTrack1(changedUser.getTrack1());
        userResponseDto2.setTrack2(changedUser.getTrack2());
        userResponseDto2.setDetail(changedUser.getDetail());
        userResponseDto2.setImages(changedUser.getImages());
        userResponseDto2.setProfile(changedUser.getProfile());
        userResponseDto2.setPhoneNum(changedUser.getPhoneNum());
        userResponseDto2.setFollowUsers(changedUser.getFollowUsers());

        return userResponseDto2;
    }
    public UserResponseDto userDetail(Integer id){
        User user = userRepository.findById(id).get();

        UserResponseDto userDetailResponseDto = new UserResponseDto();
        userDetailResponseDto.setId(user.getId());
        userDetailResponseDto.setUserId(user.getUserId());
        userDetailResponseDto.setName(user.getName());
        userDetailResponseDto.setEmail(user.getEmail());
        userDetailResponseDto.setPosition1(user.getPosition1());
        userDetailResponseDto.setPosition2(user.getPosition2());
        userDetailResponseDto.setTag(user.getTag());
        userDetailResponseDto.setTrack1(user.getTrack1());
        userDetailResponseDto.setTrack2(user.getTrack2());
        userDetailResponseDto.setDetail(user.getDetail());
        userDetailResponseDto.setImages(user.getImages());
        userDetailResponseDto.setProfile(user.getProfile());
        userDetailResponseDto.setFollowUsers(user.getFollowUsers());

        return userDetailResponseDto;
    }
    public FollowerResponseDto saveFollower(FollowerDto followerDto){
        User founduser = userRepository.findById(followerDto.getUser()).get();
        List<Integer> follow = founduser.getFollowUsers();

        follow.add(followerDto.getFollowUser());
        founduser.setFollowUsers(follow);

        userRepository.save(founduser);
        FollowerResponseDto saveFollower = new FollowerResponseDto();
        saveFollower.setUser(followerDto.getUser());
        saveFollower.setFollowUser(followerDto.getFollowUser());

        return saveFollower;
    }
    public void deleteFollower(FollowerDto followerDto){
        User founduser = userRepository.findById(followerDto.getUser()).get();
        List<Integer> follow = founduser.getFollowUsers();

        follow.remove(Integer.valueOf(followerDto.getFollowUser()));
        founduser.setFollowUsers(follow);
        userRepository.save(founduser);
    }
    public UserResponseDto ChangeDetail(Integer id,String detail){
        User founduser = userRepository.findById(id).get();
        founduser.setDetail(detail);

        User changedUser = userRepository.save(founduser);

        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setId(changedUser.getId());
        userResponseDto.setUserId(changedUser.getUserId());
        userResponseDto.setName(changedUser.getName());
        userResponseDto.setEmail(changedUser.getEmail());
        userResponseDto.setPosition1(changedUser.getPosition1());
        userResponseDto.setPosition2(changedUser.getPosition2());
        userResponseDto.setTag(changedUser.getTag());
        userResponseDto.setTrack1(changedUser.getTrack1());
        userResponseDto.setTrack2(changedUser.getTrack2());
        userResponseDto.setDetail(changedUser.getDetail());
        userResponseDto.setImages(changedUser.getImages());
        userResponseDto.setProfile(changedUser.getProfile());
        userResponseDto.setPhoneNum(changedUser.getPhoneNum());
        userResponseDto.setFollowUsers(changedUser.getFollowUsers());

        return userResponseDto;
    }
}
