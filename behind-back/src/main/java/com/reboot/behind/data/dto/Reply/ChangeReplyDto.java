package com.reboot.behind.data.dto.Reply;

import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChangeReplyDto {

    private int writerUser;

    private int replyId;

    private String content;
}
