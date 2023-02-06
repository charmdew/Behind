package com.reboot.behind.service.impl;

import com.reboot.behind.data.dto.CommentResponseDto;
import com.reboot.behind.data.dto.ReplyDto;
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
import java.util.ArrayList;
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

//    public List<ReplyResponseDto> getReplyList(Integer id){
//        Comment comment = commentRepository.findById(id).get();
//        List<Reply> replyList = replyRepository.findAllByComment(comment);
//        List<ReplyResponseDto> userResponseDtoList = new ArrayList<>();
//        for(int i=0; i<replyList.size();i++){
//            ReplyResponseDto replyResponseDto = new ReplyResponseDto();
//            replyResponseDto.setReplyId(replyList.get(i).getReplyId());
//            replyResponseDto.setWriterName(replyList.get(i).getWriterId().getName());
//            replyResponseDto.setContent(replyList.get(i).getContent());
////            replyResponseDto.setCommentId(replyList.get(i).getComment().getCommentId());
//            replyResponseDto.setCreateTime(replyList.get(i).getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//            if(replyList.get(i).getUpdatedTime()!=null){
//                replyResponseDto.setUpdateTime(replyList.get(i).getUpdatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//            }
//            else{
//                replyResponseDto.setUpdateTime(null);
//            }
//            userResponseDtoList.add(replyResponseDto);
//        }
//        return userResponseDtoList;
//
//    }
    @Override
    public void saveReply(ReplyDto replyDto){
        Reply reply = new Reply();
        User user = userRepository.findById(replyDto.getWriterId()).get();
        Comment comment = commentRepository.findById(replyDto.getCommentId()).get();
        List<Reply> replyList = comment.getReplies();

        reply.setContent(replyDto.getContent());
        reply.setWriterId(user);
        reply.setCreatedTime(LocalDateTime.now());
        replyList.add(reply);
        comment.setReplies(replyList);
//        Reply saveReply =
        replyRepository.save(reply);
        commentRepository.save(comment);




//        ReplyResponseDto replyResponseDto = new ReplyResponseDto();
//        replyResponseDto.setReplyId(saveReply.getReplyId());
//        replyResponseDto.setContent(saveReply.getContent());
//        replyResponseDto.setWriterName(user.getName());
//        replyResponseDto.setCommentId(comment.getCommentId());
//        replyResponseDto.setCreateTime(saveReply.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//
//        return replyResponseDto;

    }

    @Override
    public void changeReply(Integer replyId,String content){
        Reply foundReply = replyRepository.findById(replyId).get();
        foundReply.setContent(content);
        foundReply.setUpdatedTime(LocalDateTime.now());
        Reply changedReply = replyRepository.save(foundReply);

//        ReplyResponseDto replyResponseDto = new ReplyResponseDto();
//        replyResponseDto.setReplyId(changedReply.getReplyId());
//        replyResponseDto.setContent(changedReply.getContent());
//        replyResponseDto.setWriterName(changedReply.getWriterId().getName());
//        replyResponseDto.setCommentId(changedReply.getComment().getCommentId());
//        replyResponseDto.setCreateTime(changedReply.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
//        replyResponseDto.setUpdateTime(changedReply.getUpdatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

//        return replyResponseDto;
    }
//
    @Override
    public void deleteReply(Integer id){replyRepository.deleteById(id);}
}
