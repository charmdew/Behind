package com.reboot.behind.data.dto.Comment;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class CommentResponseDto {


    private int commentId;

    private int WriterId;

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

        private int WriterId;

        private String writerName;
    }

    public CommentResponseDto(){

    }
    @Builder
    public CommentResponseDto(int id, int writerId,String writerName,String content ,String createTime,String updateTime,List<replytmp> replys){
        this.commentId=id;
        this.WriterId=writerId;
        this.writerName=writerName;
        this.content=content;
        this.createTime=createTime;
        this.updateTime=updateTime;
        this.replys=replys;
    }
}
