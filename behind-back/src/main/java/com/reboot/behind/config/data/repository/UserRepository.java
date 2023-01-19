package com.reboot.behind.config.data.repository;

import com.reboot.behind.config.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
