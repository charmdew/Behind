package com.reboot.behind.data.repository;

import com.reboot.behind.data.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
