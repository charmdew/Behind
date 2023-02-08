package com.reboot.behind.service.impl;

import com.reboot.behind.data.dto.*;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.SearchRepository;
import com.reboot.behind.data.repository.UserRepository;
import com.reboot.behind.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    SearchRepository searchRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<UserResponseDto> getUserList() {
        List<User> userlist = userRepository.findAll();
        List<UserResponseDto> userResponseDtoList = new ArrayList<>();
        for (int i = 0; i < userlist.size(); i++) {
            UserResponseDto userResponseDto = new UserResponseDto();
            UserResponseDto.Position position = new UserResponseDto.Position();
            UserResponseDto.Track track = new UserResponseDto.Track();

            position.setFrontend(userlist.get(i).isFront());
            position.setBackend(userlist.get(i).isBack());
            position.setEmbedded(userlist.get(i).isEmbedded());


            track.setAi(userlist.get(i).isAi());
            track.setIot(userlist.get(i).isIot());
            track.setBigdata(userlist.get(i).isBigData());
            track.setBlockchain(userlist.get(i).isBlockChain());
            track.setMetabus(userlist.get(i).isMetaBus());

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
            userResponseDto.setLikeCnt(userlist.get(i).getLikeCnt());
            userResponseDto.setPosition(position);
            userResponseDto.setTrack(track);
            userResponseDtoList.add(userResponseDto);
        }
        return userResponseDtoList;
    }

    public UserResponseDto userDetail(Integer id) {
        User user = userRepository.findById(id).get();

        UserResponseDto userDetailResponseDto = new UserResponseDto();
        UserResponseDto.Position position = new UserResponseDto.Position();
        UserResponseDto.Track track = new UserResponseDto.Track();

        position.setFrontend(user.isFront());
        position.setBackend(user.isBack());
        position.setEmbedded(user.isEmbedded());


        track.setAi(user.isAi());
        track.setIot(user.isIot());
        track.setBigdata(user.isBigData());
        track.setBlockchain(user.isBlockChain());
        track.setMetabus(user.isMetaBus());

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
        userDetailResponseDto.setLikeCnt(user.getLikeCnt());

        return userDetailResponseDto;
    }

    public UserResponseDto changeUser(UserResponseDto userResponseDto) {
        User foundUser = userRepository.findById(userResponseDto.getId()).get();
        foundUser.setName(userResponseDto.getName());
        foundUser.setEmail(userResponseDto.getEmail());
        foundUser.setPhoneNum(userResponseDto.getPhoneNum());
        foundUser.setTag(userResponseDto.getTag());
        foundUser.setShowPhoneNum(userResponseDto.getShowPhoneNum());
        foundUser.setFront(userResponseDto.getPosition().isFrontend());
        foundUser.setBack(userResponseDto.getPosition().isBackend());
        foundUser.setEmbedded(userResponseDto.getPosition().isEmbedded());
        foundUser.setAi(userResponseDto.getTrack().isAi());
        foundUser.setIot(userResponseDto.getTrack().isIot());
        foundUser.setBlockChain(userResponseDto.getTrack().isBlockchain());
        foundUser.setBigData(userResponseDto.getTrack().isBigdata());
        foundUser.setMetaBus(userResponseDto.getTrack().isMetabus());
        foundUser.setRole("USER");

        User changedUser = userRepository.save(foundUser);

        UserResponseDto userResponseDto2 = new UserResponseDto();
        UserResponseDto.Position position = new UserResponseDto.Position();
        UserResponseDto.Track track = new UserResponseDto.Track();


        position.setFrontend(changedUser.isFront());
        position.setBackend(changedUser.isBack());
        position.setEmbedded(changedUser.isEmbedded());


        track.setAi(changedUser.isAi());
        track.setIot(changedUser.isIot());
        track.setBigdata(changedUser.isBigData());
        track.setBlockchain(changedUser.isBlockChain());
        track.setMetabus(changedUser.isMetaBus());

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
        userResponseDto.setLikeCnt(changedUser.getLikeCnt());

        return userResponseDto2;
    }

    public UserResponseDto ChangeDetail(Integer id, String detail) {
        User founduser = userRepository.findById(id).get();
        founduser.setDetail(detail);

        User changedUser = userRepository.save(founduser);

        UserResponseDto userResponseDto = new UserResponseDto();
        UserResponseDto.Position position = new UserResponseDto.Position();
        UserResponseDto.Track track = new UserResponseDto.Track();

        position.setFrontend(changedUser.isFront());
        position.setBackend(changedUser.isBack());
        position.setEmbedded(changedUser.isEmbedded());


        track.setAi(changedUser.isAi());
        track.setIot(changedUser.isIot());
        track.setBigdata(changedUser.isBigData());
        track.setBlockchain(changedUser.isBlockChain());
        track.setMetabus(changedUser.isMetaBus());

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
        userResponseDto.setLikeCnt(changedUser.getLikeCnt());
        return userResponseDto;
    }

    public void saveFollower(FollowerDto followerDto) {
        User foundfolloweruser = userRepository.findById(followerDto.getUser()).get(); //팔로윙
        User foundfolloweduser = userRepository.findById(followerDto.getFollowUser()).get(); //팔로우드
        List<Integer> following = foundfolloweruser.getFollowingUsers();
        List<Integer> followed = foundfolloweduser.getFollowedUsers();
        if (!following.contains(followerDto.getFollowUser())) {
            following.add(followerDto.getFollowUser());
            foundfolloweruser.setFollowingUsers(following);
            foundfolloweduser.setLikeCnt((foundfolloweduser.getLikeCnt() + 1));
            followed.add(followerDto.getUser());
            foundfolloweduser.setFollowedUsers(followed);
            userRepository.save(foundfolloweruser);
            userRepository.save(foundfolloweduser);
        }


    }

    public void deleteFollower(FollowerDto followerDto) {
        User foundfolloweruser = userRepository.findById(followerDto.getUser()).get(); //팔로윙
        User foundfolloweduser = userRepository.findById(followerDto.getFollowUser()).get(); //팔로우드
        List<Integer> following = foundfolloweruser.getFollowingUsers();
        List<Integer> followed = foundfolloweduser.getFollowedUsers();

        following.remove(Integer.valueOf(followerDto.getFollowUser()));
        followed.remove(Integer.valueOf(followerDto.getUser()));
        foundfolloweruser.setFollowingUsers(following);
        foundfolloweduser.setFollowedUsers(followed);
        foundfolloweduser.setLikeCnt((foundfolloweduser.getLikeCnt() - 1));
        userRepository.save(foundfolloweruser);
        userRepository.save(foundfolloweduser);
    }
    public List<UserResponseDto> getSearchUserList(int x,int y) {
        List<User> userlist = searchRepository.searchUser(x,y);
        List<UserResponseDto> userResponseDtoList = new ArrayList<>();
        for (int i = 0; i < userlist.size(); i++) {
            UserResponseDto userResponseDto = new UserResponseDto();
            UserResponseDto.Position position = new UserResponseDto.Position();
            UserResponseDto.Track track = new UserResponseDto.Track();

            position.setFrontend(userlist.get(i).isFront());
            position.setBackend(userlist.get(i).isBack());
            position.setEmbedded(userlist.get(i).isEmbedded());


            track.setAi(userlist.get(i).isAi());
            track.setIot(userlist.get(i).isIot());
            track.setBigdata(userlist.get(i).isBigData());
            track.setBlockchain(userlist.get(i).isBlockChain());
            track.setMetabus(userlist.get(i).isMetaBus());

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
            userResponseDto.setLikeCnt(userlist.get(i).getLikeCnt());
            userResponseDto.setPosition(position);
            userResponseDto.setTrack(track);
            userResponseDtoList.add(userResponseDto);
        }
        return userResponseDtoList;
    }

    @Override
    public void deleteUser(Integer id) {userRepository.deleteById(id);}

    public List<String> getUserImage(Integer id) {
        //String image split으로 자르고 배열에 넣어서 보내기

        List<String> userImageList = new ArrayList<>();

        User foundUser = userRepository.findById(id).get();
        if (foundUser.getImages()==null){
            return userImageList;
        }
       else {
            String[] array = foundUser.getImages().split(",");
            for (int i = 0; i < array.length; i++) {
                userImageList.add(array[i]);
            }
            return userImageList;
        }
    }

    public void saveProfile(Integer id, String image) {

        User foundUser = userRepository.findById(id).get();
        foundUser.setProfile(image);

        userRepository.save(foundUser);

    }
    public void saveImage(Integer id, String image){

        User foundUser = userRepository.findById(id).get();
        if (foundUser.getImages()==null){
            String images = image;
            foundUser.setImages(images);
            userRepository.save(foundUser);
        }
        else {
            String images = foundUser.getImages() + "," + image;
            foundUser.setImages(images);
            userRepository.save(foundUser);
        }

    }

}



