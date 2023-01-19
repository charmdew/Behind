package com.reboot.behind.config.data.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

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
    private int track2;

    @Column(nullable = false)
    private int track1;

    private String detail;

}
