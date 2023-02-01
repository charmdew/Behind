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
    @ApiImplicitParam("아무것도 필요 없음")
    @GetMapping()
    public ResponseEntity<?> getUserList(){
        List<UserResponseDto> userlist = userService.getUserList();
        return ResponseEntity.status(HttpStatus.OK).body(userlist);
    }
    @ApiOperation(
            value = "Id(pk)를 이용한 마이페이지 회원정보 조회"
            , notes = "Id(pk)를 이용한 1명의 회원정보를 가져온다")
    @ApiImplicitParam(
            name = "id"
            , value = "사용자 아이디"
            , dataType = "int")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserDetail(@PathVariable Integer id){
        UserResponseDto userDetail = userService.userDetail(id);

        return ResponseEntity.status(HttpStatus.OK).body(userDetail);
    }
    @ApiOperation(
            value = "디테일을 제외한 회원정보 수정"
            , notes = "디테일을 제외한 회원정보를 수정한다")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "id"
                            , value = "회원 pk값"
                            , dataType = "int"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "name"
                            , value = "회원 이름"
                            , dataType = "string"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "email"
                            , value = "회원 이메일"
                            , dataType = "string"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "phoneNum"
                            , value = "회원 핸드폰 번호"
                            , dataType = "string"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "showPhoneNum"
                            , value = "회원 핸드폰 공개여부"
                            , dataType = "boolean"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "tag"
                            , value = "회원 태그"
                            , dataType = "list[string]"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "position"
                            , value = "회원 포지션"
                            , dataType = "Obcjet"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "track"
                            , value = "회원 트랙"
                            , dataType = "Obcjet"
                    )
            })
    @PatchMapping()
    public ResponseEntity<UserResponseDto> changeUser(@RequestBody UserResponseDto userResponseDto){
        System.out.println(userResponseDto);
        UserResponseDto userChangeDto = userService.changeUser(userResponseDto);

        return ResponseEntity.status(HttpStatus.OK).body(userChangeDto);
    }
    @ApiOperation(
            value = "회원 Detail 수정"
            , notes = "회원 Detail을 수정한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "id"
                            , value = "회원 pk값"
                            , dataType = "int"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "detail"
                            , value = "회원 디테일 수정내용"
                            , dataType = "string"
                    )
            })
    @PatchMapping("/detail")
    public ResponseEntity<UserResponseDto> ChangeDetail(@RequestBody ChangeUserDetailDto changeUserDetailDto) throws Exception {
        UserResponseDto userResponseDto = userService.ChangeDetail(changeUserDetailDto.getId(), changeUserDetailDto.getDetail());

        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
    }
    @ApiOperation(
            value = "좋아요(팔로우) 좋아요 리스트에 추가"
            , notes = "좋아요(팔로우)를 누르면 팔로우 리스트에 추가한다")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "user"
                            , value = "누른 사람(로그인 되어 있는 회원) id(pk)"
                            , dataType = "int"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "followUser"
                            , value = "명함에 있는 유저 id(pk)"
                            , dataType = "int"
                    )
            })
    @PostMapping("/like")
    public ResponseEntity<String> createFollower(@RequestBody FollowerDto followerDto){
        userService.saveFollower(followerDto);

        return ResponseEntity.status(HttpStatus.OK).body("팔로우 성공!");
    }
    @ApiOperation(
            value = "좋아요(팔로우) 삭제"
            , notes = "좋아요(팔로우)삭제 리스트에서 제거")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "user"
                            , value = "누른 사람(로그인 되어 있는 회원) id(pk)"
                            , dataType = "int"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "followUser"
                            , value = "명함에 있는 유저 id(pk)"
                            , dataType = "int"
                    )
            })
    @DeleteMapping("/like")
    public ResponseEntity<String> deleteFollower(@RequestBody FollowerDto followerDto) throws Exception {
        userService.deleteFollower(followerDto);

        return ResponseEntity.status(HttpStatus.OK).body("팔로우 취소!");
    }
//    @ApiOperation(
//            value = "좋아요(팔로우) 좋아요 리스트에 추가"
//            , notes = "좋아요(팔로우)를 누르면 팔로우 리스트에 추가한다")
//    @ApiImplicitParams(
//            {
//                    @ApiImplicitParam(
//                            name = "user"
//                            , value = "누른 사람(로그인 되어 있는 회원) id(pk)"
//                            , dataType = "int"
//                    )
//                    ,
//                    @ApiImplicitParam(
//                            name = "followUser"
//                            , value = "명함에 있는 유저 id(pk)"
//                            , dataType = "int"
//                    )
//            })
//    @GetMapping("/search")
//    public ResponseEntity<?> getSearchUserList(@RequestParam int position, @RequestParam int track){
//        List<UserResponseDto> userlist = userService.getSearchUserList(position,track);
//        return ResponseEntity.status(HttpStatus.OK).body(userlist);
//    }
}


