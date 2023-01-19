package com.reboot.behind.data.dto;

public class ChangeCommentDto {

    private Long id;

    private String content;

    public ChangeCommentDto(Long id, String content) {
        this.id = id;
        this.content = content;
    }

    public ChangeCommentDto() {
    }

    public Long getId() {
        return this.id;
    }

    public String getContent() {
        return this.content;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
