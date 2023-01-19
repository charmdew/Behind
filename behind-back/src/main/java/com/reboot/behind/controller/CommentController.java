package com.reboot.behind.controller;

import com.reboot.behind.data.dto.ChangeCommentDto;
import com.reboot.behind.data.dto.CommentDto;
import com.reboot.behind.data.dto.CommentResponseDto;
import com.reboot.behind.service.CommentService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService){
        this.commentService = commentService;
    }

    @ApiOperation(value="GET 메서드",notes = "활용한 GET Method")
    @GetMapping()
    public ResponseEntity<CommentResponseDto> getComment(Long id){
        CommentResponseDto commentResponseDto = commentService.getComment(id);

        return ResponseEntity.status(HttpStatus.OK).body(commentResponseDto);
    }

    @PostMapping()
    public ResponseEntity<CommentResponseDto> createComment(@RequestBody CommentDto commentDto){
        CommentResponseDto commentResponseDto = commentService.saveComment(commentDto);

        return ResponseEntity.status(HttpStatus.OK).body(commentResponseDto);
//        ResponseEntity<CommentResponseDto>(commentResponseDto, HttpStatus.OK)
    }

    @PatchMapping()
    public ResponseEntity<CommentResponseDto> changeCommentContent(
            @RequestBody ChangeCommentDto changeCommentDto) throws Exception {

        CommentResponseDto commentResponseDto = commentService.changeCommentContent(
                changeCommentDto.getId(),
                changeCommentDto.getContent());

        return ResponseEntity.status(HttpStatus.OK).body(commentResponseDto);

    }

    @DeleteMapping()
    public ResponseEntity<String> deleteComment(Long id) throws Exception {
        commentService.deleteComment(id);

        return ResponseEntity.status(HttpStatus.OK).body("삭제 완료!!!!!");
    }
}
