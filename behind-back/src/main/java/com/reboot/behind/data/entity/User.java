package com.reboot.behind.data.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String userId;

    @JsonProperty(access = Access.WRITE_ONLY) //Json으로 결과가 출력되지 않도록 어노테이션 설정 값을 추가하였다.
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private int position1;
    @Column(nullable = false)
    private int position2;

    @Column(nullable = false)
    private String tag;

    private String phoneNum;

    @Column(nullable = false)
    private int track1;

    @Column(nullable = false)
    private int track2;

    private String detail;

    private String images;

    private String profile;

    @OneToMany(mappedBy="user", fetch = FetchType.EAGER)
    private List<FollowUser> followUserList;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return this.userId;
    }

    //계정 만료 체크하는 로직. 사용하지 않으므로 true
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return false;
    }


    //계정이 잠겼는지 체크하는 로직. 현재 사용하지 않으므로 true로 두었다.
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    //패스워드 만료 체크 로직. 사용하지 않으므로 true;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //계정이 사용가능한지 체크하는 로직이다. 현재 계정 정지 기능을 사용하지 않으므로 true로 두었다.
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isEnabled() {
        return true;
    }
}
