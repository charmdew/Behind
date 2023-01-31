package com.reboot.behind.data.controller;

import com.reboot.behind.data.dto.*;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "id"
                            , value = "회원 pk값"
                            , dataType = "int"
                    )
            })
    public ResponseEntity<?> getCommentList(@RequestParam Integer id){
        System.out.println(id);
        List<CommentResponseDto> commentList = commentService.getCommentList(id);
        return ResponseEntity.status(HttpStatus.OK).body(commentList);
    }

    @PostMapping()
    @ApiOperation(
            value = "댓글 생성"
            , notes = "댓글 생성을 한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "writerUser"
                            , value = "작성자 id(pk)값"
                            , dataType = "Int"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "profileUser"
                            , value = "명함 회원 id(pk)값"
                            , dataType = "Int"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "content"
                            , value = "댓글 내용"
                            , dataType = "String"
                    )
            })
    public ResponseEntity<CommentResponseDto> createComment(@RequestBody CommentDto commentDto){
        CommentResponseDto commentResponseDto = commentService.saveComment(commentDto);

        return ResponseEntity.status(HttpStatus.OK).body(commentResponseDto);
    }

    @PatchMapping()
    @ApiOperation(
            value = "댓글 id를 통해 댓글 수정"
            , notes = "댓글 id를 통해 댓글 수정")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "commentId"
                            , value = "댓글 Id(pk값)"
                            , dataType = "Int"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "content"
                            , value = "댓글 수정 내용"
                            , dataType = "String"
                    )
            })
    public  ResponseEntity<CommentResponseDto> changeCommentContent(@RequestBody ChangeCommentDto changeCommentDto) throws Exception{
        CommentResponseDto commentResponseDto = commentService.changeComment(changeCommentDto.getCommentId(), changeCommentDto.getContent());

        return ResponseEntity.status(HttpStatus.OK).body(commentResponseDto);
    }

    @DeleteMapping()
    @ApiOperation(
            value = "댓글 id를 통해 댓글 삭제"
            , notes = "댓글 id를 통해 댓글 삭제")
    @ApiImplicitParam(
            name = "id"
            , value = "댓글 id(pk값)"
            , dataType = "Int"
    )
    public ResponseEntity<String> deleteComment(Integer id) throws  Exception{
        commentService.deleteComment(id);

        return ResponseEntity.status(HttpStatus.OK).body("삭제완료!!!!");
    }


}
