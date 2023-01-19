package com.reboot.behind.data.dao.impl;

import com.reboot.behind.data.dao.CommentDAO;
import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentDAOImpl implements CommentDAO {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentDAOImpl(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }

    @Override
    public Comment insertComment(Comment comment){
        Comment saveComment = commentRepository.save(comment);

        return saveComment;
    }

    @Override
    public Comment selectComment(Long id){
        Comment selectedComment = commentRepository.getById(id);

        return selectedComment;
    }
    //P.122

}
