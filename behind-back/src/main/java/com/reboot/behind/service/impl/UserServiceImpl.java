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
        List<User> userlist = userRepository.findAll();
        List<UserResponseDto> userResponseDtoList = new ArrayList<>();
        int i;
        for(i=0;i<userlist.size();i++){
            System.out.println("유저리스트 들어옴");
            UserResponseDto userResponseDto = new UserResponseDto();
            userResponseDto.setId(userlist.get(i).getId());
            userResponseDto.setUserId(userlist.get(i).getUserId());
            userResponseDto.setDetail(userlist.get(i).getDetail());
            userResponseDto.setTag(userlist.get(i).getTag());
            userResponseDto.setEmail(userlist.get(i).getEmail());
            userResponseDto.setName(userlist.get(i).getName());
            userResponseDto.setPhoneNum(userlist.get(i).getPhoneNum());
            userResponseDto.setShowPhoneNum(userlist.get(i).isShowPhoneNum());
            userResponseDto.setFollowingUsers(userlist.get(i).getFollowingUsers());
            userResponseDto.setFollowedUsers(userlist.get(i).getFollowedUsers());
            userResponseDto.setImages(userlist.get(i).getImages());
            userResponseDto.setProfile(userlist.get(i).getProfile());
            userResponseDto.setPosition(" frontend : true," +
                    "  backend : true," +
                    "  embeded: false");
            userResponseDto.setTrack(" ai : true," +
                    "  iot : true," +
                    "  bigdata : false," +
                    "  blockchain : false");
            userResponseDtoList.add(userResponseDto);
        }
//        System.out.println(userResponseDtoList);
        return userResponseDtoList;
    }
    public UserResponseDto userDetail(Integer id){
        User user = userRepository.findById(id).get();

        UserResponseDto userDetailResponseDto = new UserResponseDto();
        userDetailResponseDto.setId(user.getId());
        userDetailResponseDto.setUserId(user.getUserId());
        userDetailResponseDto.setName(user.getName());
        userDetailResponseDto.setEmail(user.getEmail());
        userDetailResponseDto.setTag(user.getTag());
        userDetailResponseDto.setDetail(user.getDetail());
        userDetailResponseDto.setImages(user.getImages());
        userDetailResponseDto.setProfile(user.getProfile());
        userDetailResponseDto.setPhoneNum(user.getPhoneNum());
        userDetailResponseDto.setShowPhoneNum(user.isShowPhoneNum());
        userDetailResponseDto.setFollowingUsers(user.getFollowingUsers());
        userDetailResponseDto.setFollowedUsers(user.getFollowedUsers());
        userDetailResponseDto.setPosition(" frontend : true," +
                "  backend : true," +
                "  embeded: false");
        userDetailResponseDto.setTrack(" ai : true," +
                "  iot : true," +
                "  bigdata : false," +
                "  blockchain : false");

        return userDetailResponseDto;
    }
//    @Override
//    public UserResponseDto saveUser(UserDto userDto){
//        User user = new User();
//        user.setUserId(userDto.getUserId());
//        user.setName(userDto.getName());
//        user.setPassword(userDto.getPassword());
//        user.setEmail(userDto.getEmail());
//        user.setShowPhoneNum(userDto.getShowPhoneNum());
//        user.setPosition("호호");
//        user.setTrack("하하");
//        user.setTag(userDto.getTag());
//        user.setPhoneNum(userDto.getPhoneNum());
//
//        User saveUser = userRepository.save(user);
//
//        UserResponseDto userResponseDto = new UserResponseDto();
//        userResponseDto.setId(saveUser.getId());
//        userResponseDto.setUserId(saveUser.getUserId());
//        userResponseDto.setName(saveUser.getName());
//        userResponseDto.setEmail(saveUser.getEmail());
//        userResponseDto.setPosition(" frontend : true," +
//                "  backend : true," +
//                "  embeded: false");
//        userResponseDto.setTrack(" ai : true," +
//                "  iot : true," +
//                "  bigdata : false," +
//                "  blockchain : false");
//        userResponseDto.setTag(saveUser.getTag());
//        userResponseDto.setDetail(saveUser.getDetail());
//        userResponseDto.setPhoneNum(saveUser.getPhoneNum());
//        userResponseDto.setFollowingUsers(saveUser.getFollowingUsers());
//        userResponseDto.setFollowedUsers(saveUser.getFollowedUsers());
//        return userResponseDto;
//    }
    public UserResponseDto changeUser(UserResponseDto userResponseDto){
        User foundUser = userRepository.findById(userResponseDto.getId()).get();
        foundUser.setName(userResponseDto.getName());
        foundUser.setEmail(userResponseDto.getEmail());
        foundUser.setPhoneNum(userResponseDto.getPhoneNum());
        foundUser.setTag(userResponseDto.getTag());
        foundUser.setShowPhoneNum(userResponseDto.getShowPhoneNum());
        System.out.println(userResponseDto.getPosition());


        User changedUser = userRepository.save(foundUser);

        UserResponseDto userResponseDto2 = new UserResponseDto();

        userResponseDto2.setId(changedUser.getId());
        userResponseDto2.setUserId(changedUser.getUserId());
        userResponseDto2.setName(changedUser.getName());
        userResponseDto2.setEmail(changedUser.getEmail());
        userResponseDto2.setTag(changedUser.getTag());
        userResponseDto2.setDetail(changedUser.getDetail());
        userResponseDto2.setImages(changedUser.getImages());
        userResponseDto2.setProfile(changedUser.getProfile());
        userResponseDto2.setPhoneNum(changedUser.getPhoneNum());
        userResponseDto2.setShowPhoneNum(changedUser.isShowPhoneNum());
        userResponseDto2.setFollowingUsers(changedUser.getFollowingUsers());
        userResponseDto2.setFollowedUsers(changedUser.getFollowedUsers());
        //포지션,태그

        return userResponseDto2;
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
        userResponseDto.setTag(changedUser.getTag());
        userResponseDto.setDetail(changedUser.getDetail());
        userResponseDto.setImages(changedUser.getImages());
        userResponseDto.setProfile(changedUser.getProfile());
        userResponseDto.setPhoneNum(changedUser.getPhoneNum());
        userResponseDto.setShowPhoneNum(changedUser.isShowPhoneNum());
        userResponseDto.setFollowingUsers(changedUser.getFollowingUsers());
        userResponseDto.setFollowedUsers(changedUser.getFollowedUsers());
        //포지션 트랙

        return userResponseDto;
    }

    public void saveFollower(FollowerDto followerDto){
        User foundfolloweruser = userRepository.findById(followerDto.getUser()).get(); //팔로윙
        User foundfolloweduser = userRepository.findById(followerDto.getFollowUser()).get(); //팔로우드
        List<Integer> following = foundfolloweruser.getFollowingUsers();
        List<Integer> followed = foundfolloweduser.getFollowedUsers();

        following.add(followerDto.getFollowUser());
        foundfolloweruser.setFollowingUsers(following);
        followed.add(followerDto.getUser());
        foundfolloweduser.setFollowedUsers(followed);

        userRepository.save(foundfolloweruser);
        userRepository.save(foundfolloweduser);


    }
    public void deleteFollower(FollowerDto followerDto){
        User foundfolloweruser = userRepository.findById(followerDto.getUser()).get(); //팔로윙
        User foundfolloweduser = userRepository.findById(followerDto.getFollowUser()).get(); //팔로우드
        List<Integer> following = foundfolloweruser.getFollowingUsers();
        List<Integer> followed = foundfolloweduser.getFollowedUsers();

        following.remove(Integer.valueOf(followerDto.getFollowUser()));
        followed.remove(Integer.valueOf(followerDto.getUser()));
        foundfolloweruser.setFollowingUsers(following);
        foundfolloweduser.setFollowedUsers(followed);
        userRepository.save(foundfolloweruser);
        userRepository.save(foundfolloweduser);
    }
}
