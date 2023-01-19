package com.reboot.behind.service;

import com.reboot.behind.data.dto.CommentDto;
import com.reboot.behind.data.dto.CommentResponseDto;

public interface CommentService {

    CommentResponseDto getComment(Long id);

    CommentResponseDto saveComment(CommentDto commentDto);

    CommentResponseDto changeCommentContent(Long id, String content) throws Exception;

    void deleteComment(Long id) throws Exception;


}
