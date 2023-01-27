package com.reboot.behind.service;

import com.reboot.behind.data.dto.CommentDto;
import com.reboot.behind.data.dto.CommentResponseDto;
import com.reboot.behind.data.dto.UserDto;
import com.reboot.behind.data.dto.UserResponseDto;
import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.User;

import java.util.List;

public interface CommentService {

    List<Comment> getCommentList(UserResponseDto userResponseDto);

    CommentResponseDto saveComment(CommentDto commentDto);

    void deleteComment(Integer id) throws Exception;

    CommentResponseDto changeComment(Integer commentId,String content ) throws Exception;
}
