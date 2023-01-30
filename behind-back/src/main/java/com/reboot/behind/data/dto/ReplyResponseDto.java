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

    private User writerId;

    private Comment commentId;
    private String content;
}
