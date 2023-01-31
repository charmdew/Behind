package com.reboot.behind.data.controller;

import com.reboot.behind.data.dto.*;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sun.security.util.Length;

import javax.persistence.Id;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

//    @PostMapping()
//    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserDto userDto){
//        System.out.println(userDto);
//        UserResponseDto userResponseDto = userService.saveUser(userDto);
//
//        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
//    }
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

}
