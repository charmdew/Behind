package com.reboot.behind.data.controller;

import com.reboot.behind.data.dto.*;
import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.service.CommentService;
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
    public ResponseEntity<CommentResponseDto> createComment(@RequestBody CommentDto commentDto){
        CommentResponseDto commentResponseDto = commentService.saveComment(commentDto);

        return ResponseEntity.status(HttpStatus.OK).body(commentResponseDto);
    }
    @GetMapping()
    public ResponseEntity<?> getCommentList(@RequestBody UserResponseDto userResponseDto){
        System.out.println(userResponseDto);
        List<Comment> commentList = commentService.getCommentList(userResponseDto);
//        List<UserGetResponseDto> userList = userService.getUserList();
        return ResponseEntity.status(HttpStatus.OK).body(commentList);
    }
    @DeleteMapping()
    public ResponseEntity<String> deleteComment(Integer id) throws  Exception{
        commentService.deleteComment(id);

        return ResponseEntity.status(HttpStatus.OK).body("삭제완료!!!!");
    }
    @PatchMapping()
    public  ResponseEntity<CommentResponseDto> changeCommentContent(@RequestBody ChangeCommentDto changeCommentDto) throws Exception{
        CommentResponseDto commentResponseDto = commentService.changeComment(changeCommentDto.getCommentId(), changeCommentDto.getContent());

        return ResponseEntity.status(HttpStatus.OK).body(commentResponseDto);
    }

}
