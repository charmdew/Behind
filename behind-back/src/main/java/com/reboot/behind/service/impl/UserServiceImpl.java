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
        for(int i=0;i<userlist.size();i++){
            UserResponseDto userResponseDto = new UserResponseDto();
            UserResponseDto.Position position = new UserResponseDto.Position();
            UserResponseDto.Track track = new UserResponseDto.Track();

            String cut = userlist.get(i).getPosition();
            String cutPosition[] = cut.split("/");
            position.setFrontend(cutPosition[0]);
            position.setBackend(cutPosition[1]);
            position.setEmbeded(cutPosition[2]);

            String cut2 = userlist.get(i).getTrack();
            String cutTrack[] = cut2.split("/");
            track.setAi(cutTrack[0]);
            track.setIot(cutTrack[1]);
            track.setBigdata(cutTrack[2]);
            track.setBlockchain(cutTrack[3]);

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
            userResponseDto.setPosition(position);
            userResponseDto.setTrack(track);
            userResponseDtoList.add(userResponseDto);
        }
        return userResponseDtoList;
    }
    public UserResponseDto userDetail(Integer id){
        User user = userRepository.findById(id).get();

        UserResponseDto userDetailResponseDto = new UserResponseDto();
        UserResponseDto.Position position = new UserResponseDto.Position();
        UserResponseDto.Track track = new UserResponseDto.Track();

        String cut = user.getPosition();
        String cutPosition[] = cut.split("/");
        position.setFrontend(cutPosition[0]);
        position.setBackend(cutPosition[1]);
        position.setEmbeded(cutPosition[2]);

        String cut2 = user.getTrack();
        String cutTrack[] = cut2.split("/");
        track.setAi(cutTrack[0]);
        track.setIot(cutTrack[1]);
        track.setBigdata(cutTrack[2]);
        track.setBlockchain(cutTrack[3]);

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
        userDetailResponseDto.setPosition(position);
        userDetailResponseDto.setTrack(track);

        return userDetailResponseDto;
    }
    public UserResponseDto changeUser(UserResponseDto userResponseDto){
        User foundUser = userRepository.findById(userResponseDto.getId()).get();
        foundUser.setName(userResponseDto.getName());
        foundUser.setEmail(userResponseDto.getEmail());
        foundUser.setPhoneNum(userResponseDto.getPhoneNum());
        foundUser.setTag(userResponseDto.getTag());
        foundUser.setShowPhoneNum(userResponseDto.getShowPhoneNum());
        foundUser.setPosition(userResponseDto.getPosition().getFrontend().toString()+"/"+userResponseDto.getPosition().getBackend().toString()+"/"+userResponseDto.getPosition().getEmbeded().toString());
        foundUser.setTrack(userResponseDto.getTrack().getAi().toString()+"/"+userResponseDto.getTrack().getIot().toString()+"/"+userResponseDto.getTrack().getBigdata().toString()+"/"+userResponseDto.getTrack().getBlockchain().toString());


        User changedUser = userRepository.save(foundUser);

        UserResponseDto userResponseDto2 = new UserResponseDto();
        UserResponseDto.Position position = new UserResponseDto.Position();
        UserResponseDto.Track track = new UserResponseDto.Track();

        String cut = changedUser.getPosition();
        String cutPosition[] = cut.split("/");
        position.setFrontend(cutPosition[0]);
        position.setBackend(cutPosition[1]);
        position.setEmbeded(cutPosition[2]);

        String cut2 = changedUser.getTrack();
        String cutTrack[] = cut2.split("/");
        track.setAi(cutTrack[0]);
        track.setIot(cutTrack[1]);
        track.setBigdata(cutTrack[2]);
        track.setBlockchain(cutTrack[3]);

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
        userResponseDto2.setPosition(position);
        userResponseDto2.setTrack(track);

        return userResponseDto2;
    }
    public UserResponseDto ChangeDetail(Integer id,String detail){
        User founduser = userRepository.findById(id).get();
        founduser.setDetail(detail);

        User changedUser = userRepository.save(founduser);

        UserResponseDto userResponseDto = new UserResponseDto();
        UserResponseDto.Position position = new UserResponseDto.Position();
        UserResponseDto.Track track = new UserResponseDto.Track();

        String cut = changedUser.getPosition();
        String cutPosition[] = cut.split("/");
        position.setFrontend(cutPosition[0]);
        position.setBackend(cutPosition[1]);
        position.setEmbeded(cutPosition[2]);

        String cut2 = changedUser.getTrack();
        String cutTrack[] = cut2.split("/");
        track.setAi(cutTrack[0]);
        track.setIot(cutTrack[1]);
        track.setBigdata(cutTrack[2]);
        track.setBlockchain(cutTrack[3]);

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
        userResponseDto.setPosition(position);
        userResponseDto.setTrack(track);

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
