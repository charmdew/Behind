package com.reboot.behind.data.dto.Comment;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChangeCommentDto {

    private int writerUser;

    private int commentId;

    private String content;
}
