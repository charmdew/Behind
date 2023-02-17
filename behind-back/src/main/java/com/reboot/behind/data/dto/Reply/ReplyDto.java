package com.reboot.behind.data.dto.Reply;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReplyDto {

    private int writerId;

    private int commentId;
    private String content;

}
