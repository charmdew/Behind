package com.reboot.behind.service.impl;

import com.reboot.behind.config.security.auth.PrincipalDetails;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LOGGER.info("[loadUserByUsername] loadUserByUsername 수행. id : {}", username);
        int id = Integer.parseInt(username);
        User user = userRepository.findById(id).get();
        if(user == null){
            return null;
        }else{
            return new PrincipalDetails(user);
        }
    }
}
