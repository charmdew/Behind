package com.reboot.behind.data.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class User {
    @Id
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private int position1;
    @Column(nullable = false)
    private int position2;

    @Column(nullable = false)
    private String tag;

    @Column(nullable = false)
    private int track1;

    @Column(nullable = false)
    private int track2;

    private String detail;

    private String image;

    private String profile;

    @OneToMany(mappedBy="user", fetch = FetchType.EAGER)
    private List<FollowUser> followUserList;

}
