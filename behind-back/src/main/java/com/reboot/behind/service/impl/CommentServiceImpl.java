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
    public CommentResponseDto saveComment(CommentDto commentDto){
        Comment comment = new Comment();
        User user = userRepository.findById(commentDto.getWriterUser()).get();
        User user2 = userRepository.findById(commentDto.getProfileUser()).get();


        comment.setWriterUser(user);
        comment.setProfileUser(user2);
        comment.setContent(commentDto.getContent());
        comment.setCreatedTime(LocalDateTime.now());
        comment.setUpdatedTime(LocalDateTime.now()); // 업데이트 제거 시간도 보내줘야함 post 요청 물어보기 // 댓글 작성시 다시 불러오는가? // 댓글

        Comment saveComment = commentRepository.save(comment);

        CommentResponseDto commentResponseDto = new CommentResponseDto();
        commentResponseDto.setCommentId(saveComment.getCommentId());
        commentResponseDto.setWriterUser(user);
        commentResponseDto.setProfileUser(user2);
        commentResponseDto.setContent(saveComment.getContent());

        return commentResponseDto;

    }
    @Override
    public List<Comment> getCommentList(Integer id){
        User user = userRepository.findById(id).get();
        return commentRepository.findAllByProfileUser(user);

    }
    @Override
    public void deleteComment(Integer id){
        commentRepository.deleteById(id);
    }
    @Override
    public CommentResponseDto changeComment(Integer commentId,String content){
        Comment foundComment = commentRepository.findById(commentId).get();
        foundComment.setContent(content);
        User user = foundComment.getProfileUser();
        User user2 = foundComment.getWriterUser();
        Comment changedComment = commentRepository.save(foundComment);

        CommentResponseDto commentResponseDto = new CommentResponseDto();
        commentResponseDto.setCommentId(changedComment.getCommentId());
        commentResponseDto.setContent(changedComment.getContent());
        commentResponseDto.setWriterUser(user2);
        commentResponseDto.setProfileUser(user);

        return commentResponseDto;
    }
}
