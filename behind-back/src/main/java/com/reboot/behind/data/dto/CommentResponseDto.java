package com.reboot.behind.data.dto;

import com.reboot.behind.data.entity.Reply;
import com.reboot.behind.data.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
public class CommentResponseDto {


    private int commentId;

    private String writerName;

    private String content;

    private String createTime;

    private String updateTime;

    private List<replytmp> replys;

    @Getter
    @Setter
    @ToString
    public static class replytmp{
        private int replyId ;
        private  String content;
        private String createTime;

        private String updateTime;

        private String writerName;
    }
}
