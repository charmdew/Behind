package com.reboot.behind.service.impl;

import com.reboot.behind.data.dto.*;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.UserRepository;
import com.reboot.behind.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

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

            position.setFRONTEND(userlist.get(i).isFront());
            position.setBACKEND(userlist.get(i).isBack());
            position.setEMBEDED(userlist.get(i).isEmbedded());


            track.setAI(userlist.get(i).isAi());
            track.setIOT(userlist.get(i).isIot());
            track.setBIGDATA(userlist.get(i).isBigData());
            track.setBLOCKCHAIN(userlist.get(i).isBlockChain());

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

        position.setFRONTEND(user.isFront());
        position.setBACKEND(user.isBack());
        position.setEMBEDED(user.isEmbedded());


        track.setAI(user.isAi());
        track.setIOT(user.isIot());
        track.setBIGDATA(user.isBigData());
        track.setBLOCKCHAIN(user.isBlockChain());

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
        foundUser.setFront(userResponseDto.getPosition().isFRONTEND());
        foundUser.setBack(userResponseDto.getPosition().isBACKEND());
        foundUser.setEmbedded(userResponseDto.getPosition().isEMBEDED());
        foundUser.setAi(userResponseDto.getTrack().isAI());
        foundUser.setIot(userResponseDto.getTrack().isIOT());
        foundUser.setBlockChain(userResponseDto.getTrack().isBLOCKCHAIN());
        foundUser.setBigData(userResponseDto.getTrack().isBIGDATA());

        User changedUser = userRepository.save(foundUser);

        UserResponseDto userResponseDto2 = new UserResponseDto();
        UserResponseDto.Position position = new UserResponseDto.Position();
        UserResponseDto.Track track = new UserResponseDto.Track();


        position.setFRONTEND(changedUser.isFront());
        position.setBACKEND(changedUser.isBack());
        position.setEMBEDED(changedUser.isEmbedded());


        track.setAI(changedUser.isAi());
        track.setIOT(changedUser.isIot());
        track.setBIGDATA(changedUser.isBigData());
        track.setBLOCKCHAIN(changedUser.isBlockChain());

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

        position.setFRONTEND(changedUser.isFront());
        position.setBACKEND(changedUser.isBack());
        position.setEMBEDED(changedUser.isEmbedded());


        track.setAI(changedUser.isAi());
        track.setIOT(changedUser.isIot());
        track.setBIGDATA(changedUser.isBigData());
        track.setBLOCKCHAIN(changedUser.isBlockChain());

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

        following.add(followerDto.getFollowUser());
        foundfolloweruser.setFollowingUsers(following);
        foundfolloweduser.setLikeCnt((foundfolloweduser.getLikeCnt() + 1));
        followed.add(followerDto.getUser());
        foundfolloweduser.setFollowedUsers(followed);

        userRepository.save(foundfolloweruser);
        userRepository.save(foundfolloweduser);


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
}
//        String select = "SELECT u from User u";
//        String where = "WHERE";
//
//        switch (searchPosition){
//            case 0 :
//                break;
//            case 1 :
//                where = where +"u.frontEnd = true";
//                break;
//            case 2 :
//                where = where +"u.backEnd = true";
//                break;
//            case 3 :
//                where = where +"u.embedded = true";
//                break;
//        }
//        if(searchPosition != 0 && searchTrack != 0){
//            where += "AND";
//        }
//        switch (searchTrack){
//            case 0 :
//                break;
//            case 1 :
//                where = where +"u.track1 = true";
//                break;
//            case 2 :
//                where = where +"u.track2 = true";
//                break;
//            case 3 :
//                where = where +"u.track3 = true";
//                break;
//            case 3 :
//                where = where +"u.track4 = true";
//                break;
//        }


