package com.reboot.behind.data.controller;

import com.reboot.behind.data.dto.*;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import sun.security.util.Length;

import javax.persistence.Id;
import java.util.List;

@RestController
@Api(description = "회원 전체조회 조회 정보수정 Detail수정 좋아요(팔로우) 좋아요(팔로우)삭제  ")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }
    @ApiOperation(
        value = "모든 사용자 정보 조회(메인화면)"
        , notes = "모든 사용자의 정보를 가져온다")
    @GetMapping()
    public ResponseEntity<?> getUserList(){
        List<UserResponseDto> userlist = userService.getUserList();
        return ResponseEntity.status(HttpStatus.OK).body(userlist);
    }
    @ApiOperation(
            value = "Id(pk)를 이용한 마이페이지 회원정보 조회"
            , notes = "Id(pk)를 이용한 1명의 회원정보를 가져온다")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserDetail(@PathVariable Integer id){
        UserResponseDto userDetail = userService.userDetail(id);

        return ResponseEntity.status(HttpStatus.OK).body(userDetail);
    }
    @ApiOperation(
            value = "디테일을 제외한 회원정보 수정"
            , notes = "디테일을 제외한 회원정보를 수정한다")
    @PatchMapping()
    public ResponseEntity<UserResponseDto> changeUser(@RequestBody UserResponseDto userResponseDto){
        System.out.println(userResponseDto);
        System.out.println("호호호호호호호");
//        int id = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
//        System.out.println(id);
        UserResponseDto userChangeDto = userService.changeUser(userResponseDto);

        return ResponseEntity.status(HttpStatus.OK).body(userChangeDto);
    }
    @ApiOperation(
            value = "회원 Detail 수정"
            , notes = "회원 Detail을 수정한다.")
    @PatchMapping("/detail")
    public ResponseEntity<UserResponseDto> ChangeDetail(@RequestBody ChangeUserDetailDto changeUserDetailDto) throws Exception {
        UserResponseDto userResponseDto = userService.ChangeDetail(changeUserDetailDto.getId(), changeUserDetailDto.getDetail());

        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
    }
    @ApiOperation(
            value = "좋아요(팔로우) 좋아요 리스트에 추가"
            , notes = "좋아요(팔로우)를 누르면 팔로우 리스트에 추가한다")
    @PostMapping("/like")
    public ResponseEntity<String> createFollower(@RequestBody FollowerDto followerDto){
        userService.saveFollower(followerDto);

        return ResponseEntity.status(HttpStatus.OK).body("팔로우 성공!");
    }
    @ApiOperation(
            value = "좋아요(팔로우) 삭제"
            , notes = "좋아요(팔로우)삭제 리스트에서 제거")
    @DeleteMapping("/like")
    public ResponseEntity<String> deleteFollower(@RequestBody FollowerDto followerDto) throws Exception {
        userService.deleteFollower(followerDto);

        return ResponseEntity.status(HttpStatus.OK).body("팔로우 취소!");
    }
    @ApiOperation(
            value = "유저 검색"
            , notes = "position" +
            "0:선택안함" +
            "1:FRONTEND" +
            "2:BACKEND" +
            "3:EMBEDED" +
            "track" +
            "0:선택안함" +
            "1:AI" +
            "2:IOT" +
            "3:BIGDATA" +
            "4:BLOCKCHAIN")

    @GetMapping("/search")
    public ResponseEntity<?> getSearchUserList(@RequestParam int position, @RequestParam int track){
        List<UserResponseDto> userlist = userService.getSearchUserList(position,track);
        return ResponseEntity.status(HttpStatus.OK).body(userlist);
    }

    @ApiOperation(
            value = "유저 삭제"
            , notes = "유저를 삭제합니다")

    @DeleteMapping()
    public ResponseEntity<String> deleteUser(Integer id) throws  Exception{
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body("유저 삭제 완료!");
    }

    @ApiOperation(
            value = "유저 이미지 조회"
            , notes = "유저의 이미지 목록을 조회한다")

    @GetMapping("/img")
    public ResponseEntity<?> getUserImages(Integer id){
//        userService.deleteUser(id);
        List<ImageResponseDto> userImages = userService.getUserImage(id);
        return ResponseEntity.status(HttpStatus.OK).body(userImages);
    }

    @ApiOperation(
            value = "유저 프로필 저장"
            , notes = "유저의 프로필을 저장한다.")

    @PatchMapping("/img")
    public ResponseEntity<String> selectProfileImage(Integer id, String image){
        userService.saveProfile(id,image);
//        List<ImageResponseDto> userImages = userService.getUserImage(image);
        return ResponseEntity.status(HttpStatus.OK).body("프로필 등록 완료!");
    }

}


