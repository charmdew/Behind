package com.reboot.behind.data.repository;

import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Integer> {

//    List<Reply> findAllByComment(Comment comment);
}
