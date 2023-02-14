package com.reboot.behind.data.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.reboot.behind.data.dto.User.UserUpdateDto;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
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
@DynamicUpdate
//implements UserDetails
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
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
    private List<String> tag;

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

    public void updateUser(UserUpdateDto userUpdateDto){
        this.name = userUpdateDto.getName();
        this.email=userUpdateDto.getEmail();
        this.phoneNum=userUpdateDto.getPhoneNum();
        this.showPhoneNum=userUpdateDto.getShowPhoneNum();
        this.front=userUpdateDto.getPosition().isFrontend();
        this.back=userUpdateDto.getPosition().isBackend();
        this.embedded=userUpdateDto.getPosition().isEmbedded();
        this.ai=userUpdateDto.getTrack().isAi();
        this.iot=userUpdateDto.getTrack().isIot();
        this.bigData=userUpdateDto.getTrack().isBigdata();
        this.blockChain=userUpdateDto.getTrack().isBlockchain();
        this.metaBus=userUpdateDto.getTrack().isMetabus();
        this.tag=userUpdateDto.getTag();
    }
}
