//package com.reboot.behind.data.controller;
//
//import com.reboot.behind.data.dto.*;
//import com.reboot.behind.data.entity.User;
//import com.reboot.behind.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import sun.security.util.Length;
//
//import javax.persistence.Id;
//import java.util.List;
//
//@RestController
//@RequestMapping("/users")
//public class UserController {
//
//    private final UserService userService;
//
//    @Autowired
//    public UserController(UserService userService){
//        this.userService = userService;
//    }
//
//    @PostMapping()
//    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserDto userDto){
//        System.out.println(userDto);
//        UserResponseDto userResponseDto = userService.saveUser(userDto);
//
//        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
//    }
//
//    @GetMapping()
//    public ResponseEntity<?> getUserList(){
//        List<UserResponseDto> userlist = userService.getUserList();
////        List<UserGetResponseDto> userList = userService.getUserList();
//        return ResponseEntity.status(HttpStatus.OK).body(userlist);
//    }
//    @PatchMapping()
//    public ResponseEntity<UserResponseDto> changeUser(@RequestBody UserResponseDto userResponseDto){
//        UserResponseDto userChangeDto = userService.changeUser(userResponseDto);
//
//        return ResponseEntity.status(HttpStatus.OK).body(userChangeDto);
//    }
//    @GetMapping("/{id}")
//    public ResponseEntity<UserResponseDto> getUserDetail(@PathVariable Integer id){
//        UserResponseDto userDetail = userService.userDetail(id);
//
//        return ResponseEntity.status(HttpStatus.OK).body(userDetail);
//    }
//    @PostMapping("/like")
//    public ResponseEntity<FollowerResponseDto> createFollower(@RequestBody FollowerDto followerDto){
//        FollowerResponseDto followerResponseDto = userService.saveFollower(followerDto);
//
//        return ResponseEntity.status(HttpStatus.OK).body(followerResponseDto);
//    }
//    @DeleteMapping("/like")
//    public ResponseEntity<String> deleteFollower(@RequestBody FollowerDto followerDto) throws Exception {
//        userService.deleteFollower(followerDto);
//
//        return ResponseEntity.status(HttpStatus.OK).body("팔로우 취소!!!!");
//    }
//    @PatchMapping("/detail")
//    public ResponseEntity<UserResponseDto> ChangeDetail(@RequestBody ChangeUserDetailDto changeUserDetailDto) throws Exception {
//        UserResponseDto userResponseDto = userService.ChangeDetail(changeUserDetailDto.getId(), changeUserDetailDto.getDetail());
//
//        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
//    }
//}
