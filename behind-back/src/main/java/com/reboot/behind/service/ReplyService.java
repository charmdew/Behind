package com.reboot.behind.service;


import com.reboot.behind.data.dto.ReplyDto;
import com.reboot.behind.data.dto.ReplyResponseDto;

public interface ReplyService {

    ReplyResponseDto saveReply(ReplyDto replyDto);

    void deleteReply(Integer id) throws Exception;

    ReplyResponseDto changeReply(Integer replyId,String content);
}
