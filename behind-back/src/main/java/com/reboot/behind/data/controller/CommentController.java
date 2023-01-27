package com.reboot.behind.data.controller;

import com.reboot.behind.data.dto.*;
import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.service.CommentService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {


    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @PostMapping()
    @ApiOperation(
            value = "댓글 생성"
            , notes = "댓글 생성을 한다.")
    public ResponseEntity<CommentResponseDto> createComment(@RequestBody CommentDto commentDto){
        CommentResponseDto commentResponseDto = commentService.saveComment(commentDto);

        return ResponseEntity.status(HttpStatus.OK).body(commentResponseDto);
    }
    @GetMapping()//get은 param만
    @ApiOperation(
            value = "사용자 id를 통해 댓글 조회"
            , notes = "마이페이지 댓글 조회")
    public ResponseEntity<?> getCommentList(@RequestParam Integer id){
        System.out.println(id);
        List<Comment> commentList = commentService.getCommentList(id);
//        List<UserGetResponseDto> userList = userService.getUserList();
        return ResponseEntity.status(HttpStatus.OK).body(commentList);
    }
    @DeleteMapping()
    @ApiOperation(
            value = "댓글 id를 통해 댓글 삭제"
            , notes = "댓글 id를 통해 댓글 삭제")
    public ResponseEntity<String> deleteComment(Integer id) throws  Exception{
        commentService.deleteComment(id);

        return ResponseEntity.status(HttpStatus.OK).body("삭제완료!!!!");
    }
    @PatchMapping()
    @ApiOperation(
            value = "댓글 id를 통해 댓글 수정"
            , notes = "댓글 id를 통해 댓글 수정")
    public  ResponseEntity<CommentResponseDto> changeCommentContent(@RequestBody ChangeCommentDto changeCommentDto) throws Exception{
        CommentResponseDto commentResponseDto = commentService.changeComment(changeCommentDto.getCommentId(), changeCommentDto.getContent());

        return ResponseEntity.status(HttpStatus.OK).body(commentResponseDto);
    }

}
