package com.reboot.behind.data.dto;



public class CommentDto {

    private String userId;

    private String content;

    private String parentCommentId;

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

    public CommentDto(String userId, String content, String parentCommentId){
        this.userId = userId;
        this.content = content;
        this.parentCommentId = parentCommentId;
    }


}
