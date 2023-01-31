package com.reboot.behind.data.controller;

import com.reboot.behind.data.dto.ChangeReplyDto;
import com.reboot.behind.data.dto.ReplyDto;
import com.reboot.behind.data.dto.ReplyResponseDto;
import com.reboot.behind.service.ReplyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@Api(description = "대댓글 작성 수정 삭제")
@RequestMapping("/reply")
public class ReplyController {

    private final ReplyService replyService;

    @Autowired
    public ReplyController(ReplyService replyService){
        this.replyService=replyService;
    }

    @ApiOperation(
            value = "대댓글 작성"
            , notes = "대댓글을 작성한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "writerId"
                            , value = "작성자 id(pk)값"
                            , dataType = "Int"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "commentId"
                            , value = "댓글 id(pk)값"
                            , dataType = "Int"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "content"
                            , value = "대댓글 내용"
                            , dataType = "String"
                    )
            })
    @PostMapping()
    public ResponseEntity<ReplyResponseDto> createReply(@RequestBody ReplyDto replyDto){
        ReplyResponseDto replyResponseDto = replyService.saveReply(replyDto);

        return ResponseEntity.status(HttpStatus.OK).body(replyResponseDto);
    }

    @ApiOperation(
            value = "대댓글 수정"
            , notes = "대댓글을 수정한다.")
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(
                            name = "replyId"
                            , value = "대댓글 id(pk)값"
                            , dataType = "Int"
                    )
                    ,
                    @ApiImplicitParam(
                            name = "content"
                            , value = "대댓글 수정 내용"
                            , dataType = "String"
                    )

            })
    @PatchMapping()
    public ResponseEntity<ReplyResponseDto> changeReplyContent(@RequestBody ChangeReplyDto changeReplyDto){
        ReplyResponseDto replyResponseDto = replyService.changeReply(changeReplyDto.getReplyId(), changeReplyDto.getContent());

        return ResponseEntity.status(HttpStatus.OK).body(replyResponseDto);
    }

    @ApiOperation(
            value = "대댓글 삭제"
            , notes = "대댓글을 삭제한다.")
    @ApiImplicitParam(
            name = "replyId",
            value = "대댓글 id(pk)값",
            dataType = "Int"
                    )
    @DeleteMapping()
    public ResponseEntity<String> deleteComment(Integer id) throws Exception{
        replyService.deleteReply(id);

        return ResponseEntity.status(HttpStatus.OK).body("대댓글 삭제완료!!!!");
    }
}
