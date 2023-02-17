package com.reboot.behind.service;

import com.reboot.behind.data.dto.Comment.*;
import com.reboot.behind.data.dto.User.*;
import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.User;

import java.util.List;

public interface CommentService {

    List<CommentResponseDto>  getCommentList(Integer id);

    CommentResponseDto saveComment(CommentDto commentDto);

    CommentResponseDto changeComment(Integer commentId,String content ) throws Exception;

    void deleteComment(Integer id) throws Exception;
}
