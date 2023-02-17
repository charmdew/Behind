package com.reboot.behind.data.dto.Comment;



import com.reboot.behind.data.entity.Reply;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommentDto {

    private int writerUser;

    private int profileUser;

    private String content;


}
