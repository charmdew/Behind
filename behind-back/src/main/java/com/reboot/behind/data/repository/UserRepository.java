package com.reboot.behind.data.repository;

import com.reboot.behind.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User getUserByUserId(String userId);
}
