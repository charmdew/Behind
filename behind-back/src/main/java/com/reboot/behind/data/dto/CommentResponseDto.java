package com.reboot.behind.data.dto;

import com.reboot.behind.data.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class CommentResponseDto {


    private int commentId;

    private String writerName;

    private String content;

    private String createTime;

    private String updateTime;

}
