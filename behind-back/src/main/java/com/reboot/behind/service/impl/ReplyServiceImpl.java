package com.reboot.behind.service.impl;

import com.reboot.behind.data.dto.ReplyDto;
import com.reboot.behind.data.dto.ReplyResponseDto;
import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.Reply;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.CommentRepository;
import com.reboot.behind.data.repository.ReplyRepository;
import com.reboot.behind.data.repository.UserRepository;
import com.reboot.behind.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;

    @Autowired
    public ReplyServiceImpl(ReplyRepository replyRepository){this.replyRepository = replyRepository;}

    @Autowired
    UserRepository userRepository;
    @Autowired
    CommentRepository commentRepository;
    @Override
    public ReplyResponseDto saveReply(ReplyDto replyDto){
        Reply reply = new Reply();
        User user = userRepository.findById(replyDto.getWriterId()).get();
        Comment comment = commentRepository.findById(replyDto.getCommentId()).get();

        reply.setContent(replyDto.getContent());
//        reply.setComment(comment);
        reply.setWriterId(user);
        reply.setCreatedTime(LocalDateTime.now());
        Reply saveReply = replyRepository.save(reply);

        ReplyResponseDto replyResponseDto = new ReplyResponseDto();
        replyResponseDto.setReplyId(saveReply.getReplyId());
        replyResponseDto.setContent(saveReply.getContent());
        replyResponseDto.setWriterName(user.getName());
        replyResponseDto.setCommentId(comment.getCommentId());
        replyResponseDto.setCreateTime(saveReply.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return replyResponseDto;
    }

    @Override
    public ReplyResponseDto changeReply(Integer replyId,String content){
        Reply foundReply = replyRepository.findById(replyId).get();
        foundReply.setContent(content);
        foundReply.setUpdatedTime(LocalDateTime.now());
        Reply changedReply = replyRepository.save(foundReply);

        ReplyResponseDto replyResponseDto = new ReplyResponseDto();
        replyResponseDto.setReplyId(changedReply.getReplyId());
        replyResponseDto.setContent(changedReply.getContent());
        replyResponseDto.setWriterName(changedReply.getWriterId().getName());
//        replyResponseDto.setCommentId(changedReply.getComment().getCommentId());
        replyResponseDto.setCreateTime(changedReply.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        replyResponseDto.setUpdateTime(changedReply.getUpdatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        return replyResponseDto;
    }

    @Override
    public void deleteReply(Integer id){replyRepository.deleteById(id);}
}
