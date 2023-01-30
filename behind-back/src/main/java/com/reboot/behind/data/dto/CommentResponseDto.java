package com.reboot.behind.data.dto;

import com.reboot.behind.data.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
public class CommentResponseDto {


    private int commentId;


    private User writerUser;


    private User profileUser;

    private String content;



}
