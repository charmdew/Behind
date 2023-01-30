package com.reboot.behind.data.dto;



import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@ToString
public class CommentDto {

    private int writerUser;


    private int profileUser;

    private String content;


}
