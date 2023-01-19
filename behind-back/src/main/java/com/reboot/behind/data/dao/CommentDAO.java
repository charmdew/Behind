package com.reboot.behind.data.dao;

import com.reboot.behind.data.entity.Comment;

public interface CommentDAO {

    Comment insertComment(Comment comment);

    Comment selectComment(Long id);

}
