package com.reboot.behind.data.dto;

public class CommentResponseDto {

    private Long id;
    private String userId;

    private String content;

    private String parentCommentId;

    public CommentResponseDto(){}

    public CommentResponseDto(Long id, String userId, String content,String parentCommentId){
        this.id = id;
        this.userId = userId;
        this.content = content;
        this.parentCommentId = parentCommentId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getParentCommentId() {
        return parentCommentId;
    }

    public void setParentCommentId(String parentCommentId) {
        this.parentCommentId = parentCommentId;
    }
}
