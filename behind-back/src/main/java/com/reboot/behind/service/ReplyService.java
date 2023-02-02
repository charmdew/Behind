package com.reboot.behind.service;


import com.reboot.behind.data.dto.ReplyDto;
import com.reboot.behind.data.dto.ReplyResponseDto;

import java.util.List;

public interface ReplyService {
    void saveReply(ReplyDto replyDto);
//
    void changeReply(Integer replyId,String content);
//
    void deleteReply(Integer id) throws Exception;
//
//    List<ReplyResponseDto> getReplyList(Integer id);
}
