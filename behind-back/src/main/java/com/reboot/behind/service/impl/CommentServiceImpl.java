package com.reboot.behind.service.impl;

import com.reboot.behind.data.dto.CommentDto;
import com.reboot.behind.data.dto.CommentResponseDto;
import com.reboot.behind.data.dto.UserDto;
import com.reboot.behind.data.dto.UserResponseDto;
import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.CommentRepository;
import com.reboot.behind.data.repository.UserRepository;
import com.reboot.behind.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }
    @Autowired
    UserRepository userRepository;

    @Override
    public List<CommentResponseDto> getCommentList(Integer id){
        User user = userRepository.findById(id).get();
        List<Comment> commentList = commentRepository.findAllByProfileUser(user);
        List<CommentResponseDto> userResponseDtoList = new ArrayList<>();


        for(int i=0; i<commentList.size();i++){
            CommentResponseDto commentResponseDto = new CommentResponseDto();
            List<CommentResponseDto.replytmp> commentReplyList = new ArrayList<>();

            commentResponseDto.setCommentId(commentList.get(i).getCommentId());
            commentResponseDto.setContent(commentList.get(i).getContent());
            commentResponseDto.setWriterId(commentList.get(i).getWriterUser().getId());
            commentResponseDto.setWriterName(commentList.get(i).getWriterUser().getName());
            commentResponseDto.setCreateTime(commentList.get(i).getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

            for(int j=0; j<commentList.get(i).getReplies().size();j++) {
                CommentResponseDto.replytmp replytmp = new CommentResponseDto.replytmp();
                replytmp.setReplyId(commentList.get(i).getReplies().get(j).getReplyId());
                replytmp.setContent(commentList.get(i).getReplies().get(j).getContent());
                replytmp.setCreateTime(commentList.get(i).getReplies().get(j).getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                if(commentList.get(i).getReplies().get(j).getUpdatedTime()!=null){
                    replytmp.setUpdateTime(commentList.get(i).getReplies().get(j).getUpdatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                }
                else{
                    replytmp.setUpdateTime(null);
                }
                replytmp.setWriterName(commentList.get(i).getReplies().get(j).getWriterId().getName());
                replytmp.setWriterId(commentList.get(i).getReplies().get(j).getWriterId().getId());
                commentReplyList.add(replytmp);
            }
            commentResponseDto.setReplys(commentReplyList);
            if(commentList.get(i).getUpdatedTime()!=null){
                commentResponseDto.setUpdateTime(commentList.get(i).getUpdatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            }
            else{
                commentResponseDto.setUpdateTime(null);
            }
            userResponseDtoList.add(commentResponseDto);
        }
        return userResponseDtoList;

    }

    @Override
    public CommentResponseDto saveComment(CommentDto commentDto){
        Comment comment = new Comment();
        User user = userRepository.findById(commentDto.getWriterUser()).get();
        User user2 = userRepository.findById(commentDto.getProfileUser()).get();
        List<CommentResponseDto.replytmp> commentReplyList = new ArrayList<>();

        comment.setWriterUser(user);
        comment.setProfileUser(user2);
        comment.setContent(commentDto.getContent());
        comment.setCreatedTime(LocalDateTime.now());

        Comment saveComment = commentRepository.save(comment);

        CommentResponseDto commentResponseDto = new CommentResponseDto();
        commentResponseDto.setCommentId(saveComment.getCommentId());
        commentResponseDto.setWriterId(user.getId());
        commentResponseDto.setWriterName(user.getName());
        commentResponseDto.setContent(saveComment.getContent());
        commentResponseDto.setCreateTime(saveComment.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        commentResponseDto.setReplys(commentReplyList);
        return commentResponseDto;

    }


    @Override
    public CommentResponseDto changeComment(Integer commentId,String content) {
        Comment foundComment = commentRepository.findById(commentId).get();
        User user2 = foundComment.getWriterUser();
        foundComment.setContent(content);
        foundComment.setUpdatedTime(LocalDateTime.now());

        Comment changedComment = commentRepository.save(foundComment);

        CommentResponseDto commentResponseDto = new CommentResponseDto();
        List<CommentResponseDto.replytmp> commentReplyList = new ArrayList<>();
        commentResponseDto.setCommentId(changedComment.getCommentId());
        commentResponseDto.setContent(changedComment.getContent());
        commentResponseDto.setWriterId(user2.getId());
        commentResponseDto.setWriterName(user2.getName());

        for (int j = 0; j < changedComment.getReplies().size(); j++) {
            CommentResponseDto.replytmp replytmp = new CommentResponseDto.replytmp();
            replytmp.setReplyId(changedComment.getReplies().get(j).getReplyId());
            replytmp.setContent(changedComment.getReplies().get(j).getContent());
            replytmp.setCreateTime(changedComment.getReplies().get(j).getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            if (changedComment.getReplies().get(j).getUpdatedTime() != null) {
                replytmp.setUpdateTime(changedComment.getReplies().get(j).getUpdatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            } else {
                replytmp.setUpdateTime(null);
            }
            replytmp.setWriterName(changedComment.getReplies().get(j).getWriterId().getName());
            replytmp.setWriterId(changedComment.getReplies().get(j).getWriterId().getId());
            commentReplyList.add(replytmp);
        }
        commentResponseDto.setReplys(commentReplyList);
        commentResponseDto.setUpdateTime(changedComment.getUpdatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return commentResponseDto;
    }

    @Override
    public void deleteComment(Integer id){
        commentRepository.deleteById(id);
    }
}
