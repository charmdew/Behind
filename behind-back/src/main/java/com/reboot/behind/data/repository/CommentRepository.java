package com.reboot.behind.data.repository;

import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findAllByProfileUser(User user);
}
