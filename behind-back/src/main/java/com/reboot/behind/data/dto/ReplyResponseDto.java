package com.reboot.behind.data.dto;


import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReplyResponseDto {
    private int replyId;

    private String writerName;

    private int commentId;

    private String content;

    private String createTime;

    private String updateTime;
}
