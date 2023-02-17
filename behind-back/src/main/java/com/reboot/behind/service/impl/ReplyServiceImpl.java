package com.reboot.behind.service.impl;

import com.reboot.behind.data.dto.Reply.*;
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

import java.util.List;

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
    public void saveReply(ReplyDto replyDto){
        User user = userRepository.findById(replyDto.getWriterId()).get();
        Comment comment = commentRepository.findById(replyDto.getCommentId()).get();
        List<Reply> replyList = comment.getReplies();

        Reply reply = Reply.builder()
                .writerId(user)
                .content(replyDto.getContent())
                .createdTime(LocalDateTime.now())
                .build();

        replyList.add(reply);
        comment.setReplies(replyList);
        replyRepository.save(reply);
        commentRepository.save(comment);
    }

    @Override
    public void changeReply(Integer replyId,String content){
        Reply foundReply = replyRepository.findById(replyId).get();
        foundReply.setContent(content);
        foundReply.setUpdatedTime(LocalDateTime.now());
        replyRepository.save(foundReply);
    }

    @Override
    public void deleteReply(Integer id){replyRepository.deleteById(id);}
}
