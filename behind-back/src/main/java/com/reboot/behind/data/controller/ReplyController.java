package com.reboot.behind.data.controller;

import com.reboot.behind.data.dto.ChangeReplyDto;
import com.reboot.behind.data.dto.ReplyDto;
import com.reboot.behind.data.dto.ReplyResponseDto;
import com.reboot.behind.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reply")
public class ReplyController {

    private final ReplyService replyService;

    @Autowired
    public ReplyController(ReplyService replyService){
        this.replyService=replyService;
    }

    @PostMapping()
    public ResponseEntity<ReplyResponseDto> createReply(@RequestBody ReplyDto replyDto){
        ReplyResponseDto replyResponseDto = replyService.saveReply(replyDto);

        return ResponseEntity.status(HttpStatus.OK).body(replyResponseDto);
    }
    @DeleteMapping()
    public ResponseEntity<String> deleteComment(Integer id) throws Exception{
        replyService.deleteReply(id);

        return ResponseEntity.status(HttpStatus.OK).body("대댓글 삭제완료!!!!");
    }
    @PatchMapping()
    public ResponseEntity<ReplyResponseDto> changeReplyContent(@RequestBody ChangeReplyDto changeReplyDto){
        ReplyResponseDto replyResponseDto = replyService.changeReply(changeReplyDto.getReplyId(), changeReplyDto.getContent());

        return ResponseEntity.status(HttpStatus.OK).body(replyResponseDto);
    }
}
