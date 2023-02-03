package com.reboot.behind.data.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table
@Entity
//implements UserDetails
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String userId;


    @JsonProperty(access = Access.WRITE_ONLY) //Json으로 결과가 출력되지 않도록 어노테이션 설정 값을 추가하였다.
//    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    private String role;

    private String email;

    private boolean front;
    private boolean back;
    private boolean embedded;

    @ElementCollection
    private List<String> tag ;

    private String phoneNum;

    private boolean showPhoneNum;

    private boolean ai;

    private boolean iot;

    private boolean blockChain;

    private boolean bigData;
    private boolean metaBus;

    private String detail;

    private String images;

    private String profile;

    private int likeCnt;

    @ElementCollection
    private List<Integer> followingUsers;

    @ElementCollection
    private List<Integer> followedUsers;

}
