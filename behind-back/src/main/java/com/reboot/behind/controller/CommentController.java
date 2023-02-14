package com.reboot.behind.controller;

import com.reboot.behind.config.security.auth.PrincipalDetails;
import com.reboot.behind.data.dto.Comment.*;
import com.reboot.behind.data.dto.User.*;
import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@Api(description = "댓글 조회 생성 수정 삭제 ")
@RequestMapping("/comment")
public class CommentController {


    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @GetMapping()
    @ApiOperation(
            value = "사용자 id를 통해 댓글 조회"
            , notes = "마이페이지 댓글 조회")
    public ResponseEntity<?> getCommentList(@RequestParam Integer id){
        try {
            System.out.println(id);
            List<CommentResponseDto> commentList = commentService.getCommentList(id);
            return ResponseEntity.status(HttpStatus.OK).body(commentList);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    @PostMapping()
    @ApiOperation(
            value = "댓글 생성"
            , notes = "댓글 생성을 한다.")
    public ResponseEntity<?> createComment(@RequestBody CommentDto commentDto){
        try {
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            if (tokenId == commentDto.getWriterUser()) {
                CommentResponseDto commentResponseDto = commentService.saveComment(commentDto);

                return ResponseEntity.status(HttpStatus.OK).body(commentResponseDto);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    @PatchMapping()
    @ApiOperation(
            value = "댓글 id를 통해 댓글 수정"
            , notes = "댓글 id를 통해 댓글 수정")
    public  ResponseEntity<?> changeCommentContent(@RequestBody ChangeCommentDto changeCommentDto) throws Exception{
        try {
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            if (tokenId == changeCommentDto.getWriterUser()) {
                CommentResponseDto commentResponseDto = commentService.changeComment(changeCommentDto.getCommentId(), changeCommentDto.getContent());

                return ResponseEntity.status(HttpStatus.OK).body(commentResponseDto);
            }else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    @DeleteMapping()
    @ApiOperation(
            value = "댓글 id를 통해 댓글 삭제"
            , notes = "댓글 id를 통해 댓글 삭제")
    public ResponseEntity<String> deleteComment(Integer id ,Integer writerUser) throws  Exception{
        try {
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            if (tokenId == writerUser) {
                commentService.deleteComment(id);
                //user 번호 필요함
                return ResponseEntity.status(HttpStatus.OK).body("삭제완료!!!!");
            }
            else{
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }


}
