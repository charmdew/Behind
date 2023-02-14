package com.reboot.behind.data.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;

    @ManyToOne
    private User writerUser;

    @ManyToOne
    private User profileUser;
    @Column(nullable = false)
    private String content;

    private LocalDateTime createdTime;

    private LocalDateTime updatedTime;

    @OneToMany
    @JoinColumn(name = "commentId")
    private List<Reply> replies;

    @PrePersist//엔티티가 영속성 컨텍스트에 들어갈 때 작동함
    public void createdTime(){
        this.createdTime = LocalDateTime.now();
    }

    @PreUpdate//flush나 commit을 호출해서 데이터베이스가 수정되기 전에 실행
    public void updatedTime(){
        this.updatedTime = LocalDateTime.now();
    }
}
