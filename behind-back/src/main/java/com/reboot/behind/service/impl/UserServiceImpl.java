package com.reboot.behind.service.impl;

import com.reboot.behind.data.dto.User.*;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.SearchRepository;
import com.reboot.behind.data.repository.UserRepository;
import com.reboot.behind.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    public List<UserResponseDto> getSearchUserList(int x,int y,int page,int volume) {
        List<User> userlist = searchRepository.searchUser(x,y,(page*volume),volume);
        List<UserResponseDto> userResponseDtoList = new ArrayList<>();
        for (int i = 0; i < userlist.size(); i++) {

            UserResponseDto.Position position = new UserResponseDto.Position();
            UserResponseDto.Track track = new UserResponseDto.Track();
            List<String> userImageList = new ArrayList<>();


            position.setFrontend(userlist.get(i).isFront());
            position.setBackend(userlist.get(i).isBack());
            position.setEmbedded(userlist.get(i).isEmbedded());


            track.setMajor(userlist.get(i).isMajor());
            track.setNonMajor(userlist.get(i).isNonMajor());

            if (userlist.get(i).getImages() != null) {
                String[] array = userlist.get(i).getImages().split(",");
                for (int m = 0; m < array.length; m++) {
                    userImageList.add(array[m]);
                }
            }

            UserResponseDto userResponseDto = UserResponseDto.builder()
                    .id(userlist.get(i).getId())
                    .userId(userlist.get(i).getUserId())
                    .detail(userlist.get(i).getDetail())
                    .tag(userlist.get(i).getTag())
                    .email(userlist.get(i).getEmail())
                    .name(userlist.get(i).getName())
                    .phoneNum(userlist.get(i).getPhoneNum())
                    .showPhoneNum(userlist.get(i).isShowPhoneNum())
                    .followingUsers(userlist.get(i).getFollowingUsers())
                    .followedUsers(userlist.get(i).getFollowedUsers())
                    .images(userImageList)
                    .profile(userlist.get(i).getProfile())
                    .likeCnt(userlist.get(i).getLikeCnt())
                    .position(position)
                    .track(track)
                    .build();

            userResponseDtoList.add(userResponseDto);
        }
        return userResponseDtoList;
    }

    public UserResponseDto userDetail(Integer id) {
        User user = userRepository.findById(id).get();

        UserResponseDto.Position position = new UserResponseDto.Position();
        UserResponseDto.Track track = new UserResponseDto.Track();
        List<String> userImageList = new ArrayList<>();

        position.setFrontend(user.isFront());
        position.setBackend(user.isBack());
        position.setEmbedded(user.isEmbedded());

        track.setMajor(user.isMajor());
        track.setNonMajor(user.isNonMajor());

        if (user.getImages() != null) {
            String[] array = user.getImages().split(",");
            for (int m = 0; m < array.length; m++) {
                userImageList.add(array[m]);
            }
        }

        UserResponseDto userResponseDto = UserResponseDto.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .detail(user.getDetail())
                .tag(user.getTag())
                .email(user.getEmail())
                .name(user.getName())
                .phoneNum(user.getPhoneNum())
                .showPhoneNum(user.isShowPhoneNum())
                .followingUsers(user.getFollowingUsers())
                .followedUsers(user.getFollowedUsers())
                .images(userImageList)
                .profile(user.getProfile())
                .likeCnt(user.getLikeCnt())
                .position(position)
                .track(track)
                .build();

        return userResponseDto;
    }

    @Transactional
    public UserResponseDto changeUser(UserUpdateDto userUpdateDto) {
        User founduser = userRepository.findById(userUpdateDto.getId()).get();

        founduser.updateUser(userUpdateDto);

        User changedUser = userRepository.findById(userUpdateDto.getId()).get();

        UserResponseDto.Position position = new UserResponseDto.Position();
        UserResponseDto.Track track = new UserResponseDto.Track();
        List<String> userImageList = new ArrayList<>();

        position.setFrontend(changedUser.isFront());
        position.setBackend(changedUser.isBack());
        position.setEmbedded(changedUser.isEmbedded());


        track.setMajor(changedUser.isMajor());
        track.setNonMajor(changedUser.isNonMajor());

        if (changedUser.getImages() != null) {
            String[] array = changedUser.getImages().split(",");
            for (int m = 0; m < array.length; m++) {
                userImageList.add(array[m]);
            }
        }

        UserResponseDto changeduserResponseDto = UserResponseDto.builder()
                .id(changedUser.getId())
                .userId(changedUser.getUserId())
                .detail(changedUser.getDetail())
                .tag(changedUser.getTag())
                .email(changedUser.getEmail())
                .name(changedUser.getName())
                .phoneNum(changedUser.getPhoneNum())
                .showPhoneNum(changedUser.isShowPhoneNum())
                .followingUsers(changedUser.getFollowingUsers())
                .followedUsers(changedUser.getFollowedUsers())
                .images(userImageList)
                .profile(changedUser.getProfile())
                .likeCnt(changedUser.getLikeCnt())
                .position(position)
                .track(track)
                .role(changedUser.getRole())
                .build();

        return changeduserResponseDto;
    }

    public UserResponseDto ChangeDetail(Integer id, String detail) {
        User founduser = userRepository.findById(id).get();
        founduser.setDetail(detail);

        User changedUser = userRepository.save(founduser);

        UserResponseDto.Position position = new UserResponseDto.Position();
        UserResponseDto.Track track = new UserResponseDto.Track();
        List<String> userImageList = new ArrayList<>();

        position.setFrontend(changedUser.isFront());
        position.setBackend(changedUser.isBack());
        position.setEmbedded(changedUser.isEmbedded());

        track.setMajor(changedUser.isMajor());
        track.setNonMajor(changedUser.isNonMajor());


        if (changedUser.getImages() != null) {
            String[] array = changedUser.getImages().split(",");
            for (int m = 0; m < array.length; m++) {
                userImageList.add(array[m]);
            }
        }

        UserResponseDto changeduserResponseDto = UserResponseDto.builder()
                .id(changedUser.getId())
                .userId(changedUser.getUserId())
                .detail(changedUser.getDetail())
                .tag(changedUser.getTag())
                .email(changedUser.getEmail())
                .name(changedUser.getName())
                .phoneNum(changedUser.getPhoneNum())
                .showPhoneNum(changedUser.isShowPhoneNum())
                .followingUsers(changedUser.getFollowingUsers())
                .followedUsers(changedUser.getFollowedUsers())
                .images(userImageList)
                .profile(changedUser.getProfile())
                .likeCnt(changedUser.getLikeCnt())
                .position(position)
                .track(track)
                .build();

        return changeduserResponseDto;
    }

    public Integer saveFollower(FollowerDto followerDto) {
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

        return foundfolloweduser.getLikeCnt();
    }

    public Integer deleteFollower(FollowerDto followerDto) {
        User foundfolloweruser = userRepository.findById(followerDto.getUser()).get(); //팔로윙
        User foundfolloweduser = userRepository.findById(followerDto.getFollowUser()).get(); //팔로우드
        List<Integer> following = foundfolloweruser.getFollowingUsers();
        List<Integer> followed = foundfolloweduser.getFollowedUsers();

        if (followed.contains(followerDto.getUser())) {
            following.remove(Integer.valueOf(followerDto.getFollowUser()));
            followed.remove(Integer.valueOf(followerDto.getUser()));
            foundfolloweruser.setFollowingUsers(following);
            foundfolloweduser.setFollowedUsers(followed);
            foundfolloweduser.setLikeCnt((foundfolloweduser.getLikeCnt() - 1));
            userRepository.save(foundfolloweruser);
            userRepository.save(foundfolloweduser);
        }
        return foundfolloweduser.getLikeCnt();
    }

    @Override
    public void deleteUser(Integer id) {

        User founduser = userRepository.findById(id).get();
        founduser.setUserId("deletedUser");

        userRepository.save(founduser);
        List<Integer> following = founduser.getFollowingUsers();
        for(int i = 0; i < following.size(); i++ ){
            User foundFollwingUser = userRepository.findById(following.get(i)).get();
            foundFollwingUser.setLikeCnt((foundFollwingUser.getLikeCnt()-1));
            foundFollwingUser.getFollowedUsers().remove(Integer.valueOf(founduser.getId()));
            userRepository.save(foundFollwingUser);
        }
        List<Integer> followed = founduser.getFollowedUsers();
        for(int i=0; i<followed.size(); i++){
            User foundFollowedUser = userRepository.findById(followed.get(i)).get();
            foundFollowedUser.getFollowingUsers().remove(Integer.valueOf(founduser.getId()));
            userRepository.save(foundFollowedUser);
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

    public List<UserResponseDto> getFollowingUser(int id){
        User founduser = userRepository.findById(id).get();
        List<UserResponseDto> userResponseDtoList = new ArrayList<>();
        List<Integer> following = founduser.getFollowingUsers();
        for(int i = 0; i < following.size(); i++ ){
            
            User foundFollwingUser = userRepository.findById(following.get(i)).get();
            
            UserResponseDto.Position position = new UserResponseDto.Position();
            UserResponseDto.Track track = new UserResponseDto.Track();
            List<String> userImageList = new ArrayList<>();

            position.setFrontend(foundFollwingUser.isFront());
            position.setBackend(foundFollwingUser.isBack());
            position.setEmbedded(foundFollwingUser.isEmbedded());


            track.setMajor(foundFollwingUser.isMajor());
            track.setNonMajor(foundFollwingUser.isNonMajor());

            if (foundFollwingUser.getImages() != null) {
                String[] array = foundFollwingUser.getImages().split(",");
                for (int m = 0; m < array.length; m++) {
                    userImageList.add(array[m]);
                }
            }

            UserResponseDto userResponseDto = UserResponseDto.builder()
                    .id(foundFollwingUser.getId())
                    .userId(foundFollwingUser.getUserId())
                    .detail(foundFollwingUser.getDetail())
                    .tag(foundFollwingUser.getTag())
                    .email(foundFollwingUser.getEmail())
                    .name(foundFollwingUser.getName())
                    .phoneNum(foundFollwingUser.getPhoneNum())
                    .showPhoneNum(foundFollwingUser.isShowPhoneNum())
                    .followingUsers(foundFollwingUser.getFollowingUsers())
                    .followedUsers(foundFollwingUser.getFollowedUsers())
                    .images(userImageList)
                    .profile(foundFollwingUser.getProfile())
                    .likeCnt(foundFollwingUser.getLikeCnt())
                    .position(position)
                    .track(track)
                    .build();

            userResponseDtoList.add(userResponseDto);
        }
        return userResponseDtoList;
    }

    public List<UserResponseDto> getFollowedUser(int id){
        User founduser = userRepository.findById(id).get();
        List<UserResponseDto> userResponseDtoList = new ArrayList<>();
        List<Integer> followed = founduser.getFollowedUsers();
        for(int i = 0; i < followed.size(); i++ ){

            User foundFollowedUser = userRepository.findById(followed.get(i)).get();

            UserResponseDto.Position position = new UserResponseDto.Position();
            UserResponseDto.Track track = new UserResponseDto.Track();
            List<String> userImageList = new ArrayList<>();

            position.setFrontend(foundFollowedUser.isFront());
            position.setBackend(foundFollowedUser.isBack());
            position.setEmbedded(foundFollowedUser.isEmbedded());


            track.setMajor(foundFollowedUser.isMajor());
            track.setNonMajor(foundFollowedUser.isNonMajor());

            if (foundFollowedUser.getImages() != null) {
                String[] array = foundFollowedUser.getImages().split(",");
                for (int m = 0; m < array.length; m++) {
                    userImageList.add(array[m]);
                }
            }

            UserResponseDto userResponseDto = UserResponseDto.builder()
                    .id(foundFollowedUser.getId())
                    .userId(foundFollowedUser.getUserId())
                    .detail(foundFollowedUser.getDetail())
                    .tag(foundFollowedUser.getTag())
                    .email(foundFollowedUser.getEmail())
                    .name(foundFollowedUser.getName())
                    .phoneNum(foundFollowedUser.getPhoneNum())
                    .showPhoneNum(foundFollowedUser.isShowPhoneNum())
                    .followingUsers(foundFollowedUser.getFollowingUsers())
                    .followedUsers(foundFollowedUser.getFollowedUsers())
                    .images(userImageList)
                    .profile(foundFollowedUser.getProfile())
                    .likeCnt(foundFollowedUser.getLikeCnt())
                    .position(position)
                    .track(track)
                    .build();

            userResponseDtoList.add(userResponseDto);
        }
        return userResponseDtoList;
    }
    public void saveRefreshToken(Integer id,String refreshToken){
        User foundUser = userRepository.findById(id).get();
        foundUser.setRefreshToken(refreshToken);
        userRepository.save(foundUser);
    }

    public String getUserRefreshToken(int id){
        User foundUser = userRepository.findById(id).get();
        return foundUser.getRefreshToken();
    }
}



