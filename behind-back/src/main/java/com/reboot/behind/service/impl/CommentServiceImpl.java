package com.reboot.behind.service.impl;

import com.reboot.behind.data.dao.CommentDAO;
import com.reboot.behind.data.dto.CommentDto;
import com.reboot.behind.data.dto.CommentResponseDto;
import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.repository.CommentRepository;
import com.reboot.behind.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepositoryo){
        this.commentRepository = commentRepositoryo;
    }

    @Override
    public CommentResponseDto getComment(Long id){
        Comment comment = commentRepository.findById(id).get();

        CommentResponseDto commentResponseDto = new CommentResponseDto();
        commentResponseDto.setId(comment.getId());
        commentResponseDto.setUserId(comment.getUserId());
        commentResponseDto.setContent(comment.getContent());
        commentResponseDto.setParentCommentId(comment.getParentCommentId());

        return commentResponseDto;
    }
    @Override
    public CommentResponseDto saveComment(CommentDto commentDto){
        Comment comment = new Comment();
        comment.setUserId(commentDto.getUserId());
        comment.setContent(commentDto.getContent());
        comment.setParentCommentId(commentDto.getParentCommentId());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());

        Comment saveComment = commentRepository.save(comment);

        CommentResponseDto commentResponseDto = new CommentResponseDto();
        commentResponseDto.setId(saveComment.getId());
        commentResponseDto.setUserId(saveComment.getUserId());
        commentResponseDto.setContent(saveComment.getContent());
        commentResponseDto.setParentCommentId(saveComment.getParentCommentId());

        return commentResponseDto;
    }

    @Override
    public CommentResponseDto changeCommentContent(Long id, String content) {
        Comment foundComment = commentRepository.findById(id).get();
        foundComment.setContent(content);
        Comment changedComment = commentRepository.save(foundComment);

        CommentResponseDto commentResponseDto = new CommentResponseDto();
        commentResponseDto.setId(changedComment.getId());
        commentResponseDto.setUserId(changedComment.getUserId());
        commentResponseDto.setContent(changedComment.getContent());
        commentResponseDto.setParentCommentId(changedComment.getParentCommentId());

        return commentResponseDto;
    }

    @Override
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
