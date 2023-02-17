package com.reboot.behind.data.repository;

import ch.qos.logback.core.util.ContextUtil;
import com.reboot.behind.data.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;



public interface UserRepository extends JpaRepository<User, Integer> {
    User getUserByUserId(String userId);

}

