package com.reboot.behind.controller;

import com.reboot.behind.config.security.auth.PrincipalDetails;
import com.reboot.behind.data.dto.Reply.*;
import com.reboot.behind.service.ReplyService;
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
    @PostMapping()
    public ResponseEntity<String> createReply(@RequestBody ReplyDto replyDto){
        try {
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            if (tokenId == replyDto.getWriterId()) {
                replyService.saveReply(replyDto);

                return ResponseEntity.status(HttpStatus.OK).body("대댓글 생성완료");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    @ApiOperation(
            value = "대댓글 수정"
            , notes = "대댓글을 수정한다.")
    @PatchMapping()
    public ResponseEntity<String> changeReplyContent(@RequestBody ChangeReplyDto changeReplyDto){
        try {
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            if (tokenId == changeReplyDto.getWriterUser()) {
                replyService.changeReply(changeReplyDto.getReplyId(), changeReplyDto.getContent());
                // 쓰는사람 id 받아와야함
                return ResponseEntity.status(HttpStatus.OK).body("수정완료");
            }
            else{
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한이 없습니다");
            }
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("요청이 잘못 들어왔습니다");
        }
    }

    @ApiOperation(
            value = "대댓글 삭제"
            , notes = "대댓글을 삭제한다.")
    @DeleteMapping()
    public ResponseEntity<String> deleteComment(Integer id, Integer writerUser) throws Exception{
        try {
            PrincipalDetails pd = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int tokenId = pd.getUser().getId();
            if (tokenId == writerUser) {
                replyService.deleteReply(id);
                // 쓰는사람 id 받아와야함
                return ResponseEntity.status(HttpStatus.OK).body("대댓글 삭제완료!!!!");
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
