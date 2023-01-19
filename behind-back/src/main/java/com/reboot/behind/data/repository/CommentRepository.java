package com.reboot.behind.data.repository;

import com.reboot.behind.data.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findById(Long id);
    List<Comment> findAllByUserId(String userId);
    Comment queryCommentById(Long id);
}
