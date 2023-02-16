package com.reboot.behind.controller;

import com.reboot.behind.config.security.auth.PrincipalDetails;
import com.reboot.behind.data.dto.User.*;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> getSearchUserList(@RequestParam int position, @RequestParam int track,@RequestParam int page,@RequestParam int volume){
        try {
            List<UserResponseDto> userlist = userService.getSearchUserList(position, track,page,volume);
            return ResponseEntity.status(HttpStatus.OK).body(userlist);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    @ApiOperation(
            value = "Id(pk)를 이용한 마이페이지 회원정보 조회"
            , notes = "Id(pk)를 이용한 1명의 회원정보를 가져온다")
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserDetail(@PathVariable Integer id){
        try {
            String name = SecurityContextHolder.getContext().getAuthentication().getName();
            System.out.println("이름:"+name);
            PrincipalDetails principalDetails = (PrincipalDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user =principalDetails.getUser();
            System.out.println("유저id:"+user.getUserId());
            System.out.println("이름:"+user.getName());
            System.out.println("id:"+user.getId());
            System.out.println("이메일:"+user.getEmail());
            UserResponseDto userDetail = userService.userDetail(id);

            return ResponseEntity.status(HttpStatus.OK).body(userDetail);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }
    @ApiOperation(
            value = "디테일을 제외한 회원정보 수정"
            , notes = "디테일을 제외한 회원정보를 수정한다")
    @PatchMapping()
    public ResponseEntity<?> changeUser(@RequestBody UserUpdateDto userUpdateDto){
        System.out.println(userUpdateDto);
        System.out.println("호호호호호호호");
        try{
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            System.out.println(tokenId);
            if (tokenId == userUpdateDto.getId()) {
                UserResponseDto userChangeDto = userService.changeUser(userUpdateDto);
                return ResponseEntity.status(HttpStatus.OK).body(userChangeDto);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }
    @ApiOperation(
            value = "회원 Detail 수정"
            , notes = "회원 Detail을 수정한다.")
    @PatchMapping("/detail")
    public ResponseEntity<?> ChangeDetail(@RequestBody ChangeUserDetailDto changeUserDetailDto) throws Exception {
        try {
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            System.out.println(tokenId);
            if (tokenId == changeUserDetailDto.getId()) {
                UserResponseDto userResponseDto = userService.ChangeDetail(changeUserDetailDto.getId(), changeUserDetailDto.getDetail());

                return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }

    }
    @ApiOperation(
            value = "좋아요(팔로우) 좋아요 리스트에 추가"
            , notes = "좋아요(팔로우)를 누르면 팔로우 리스트에 추가한다")
    @PostMapping("/like")
    public ResponseEntity<?> createFollower(@RequestBody FollowerDto followerDto){
        try {
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            System.out.println(tokenId);
            if (tokenId == followerDto.getUser()) {
                NewLikeCountDto  cnt = new NewLikeCountDto();
                cnt.setNewLikeCnt(userService.saveFollower(followerDto));
                return ResponseEntity.status(HttpStatus.OK).body(cnt);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }
    @ApiOperation(
            value = "좋아요(팔로우) 삭제"
            , notes = "좋아요(팔로우)삭제 리스트에서 제거")
    @DeleteMapping("/like")
    public ResponseEntity<?> deleteFollower(@RequestBody FollowerDto followerDto) throws Exception {
        try {
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            System.out.println(tokenId);
            if (tokenId == followerDto.getUser()) {
                NewLikeCountDto  cnt = new NewLikeCountDto();
                cnt.setNewLikeCnt(userService.deleteFollower(followerDto));
                return ResponseEntity.status(HttpStatus.OK).body(cnt);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    @ApiOperation(
            value = "유저 삭제"
            , notes = "유저를 삭제합니다")

    @DeleteMapping()
    public ResponseEntity<String> deleteUser(Integer id) throws  Exception{
        try {
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            if (tokenId == id) {
                userService.deleteUser(id);
                return ResponseEntity.status(HttpStatus.OK).body("유저 삭제 완료!");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    @ApiOperation(
            value = "유저 프로필 저장"
            , notes = "유저의 프로필을 저장한다.")

    @PatchMapping("/images")
    public ResponseEntity<String> selectProfileImage(Integer id, String image){
        try {
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            if (tokenId == id) {
                userService.saveProfile(id, image);
                return ResponseEntity.status(HttpStatus.OK).body("프로필 등록 완료!");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    @ApiOperation(
            value = "팔로우 유저 조회"
            , notes = "내가 팔로우한 유저를 조회한다.")

    @GetMapping("/following")
    public ResponseEntity<?> getFollowingUser(int id){
        try {
            List<UserResponseDto> userlist = userService.getFollowingUser(id);
            return ResponseEntity.status(HttpStatus.OK).body(userlist);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    @ApiOperation(
            value = "나를 팔로우한 유저 조회"
            , notes = "나를 팔로우한 유저를 조회한다.")

    @GetMapping("/followed")
    public ResponseEntity<?> getFollowedUser(int id){
        try {
            List<UserResponseDto> userlist = userService.getFollowedUser(id);
            return ResponseEntity.status(HttpStatus.OK).body(userlist);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }
}


