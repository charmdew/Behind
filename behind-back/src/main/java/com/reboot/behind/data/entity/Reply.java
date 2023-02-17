package com.reboot.behind.data.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Builder
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int replyId;

    @ManyToOne
    private User writerId;

    @Column(nullable = false)
    private String content;

    private LocalDateTime createdTime;

    private LocalDateTime updatedTime;

    @PrePersist//엔티티가 영속성 컨텍스트에 들어갈 때 작동함
    public void createdTime(){
        this.createdTime = LocalDateTime.now();
    }

    @PreUpdate//flush나 commit을 호출해서 데이터베이스가 수정되기 전에 실행
    public void updatedTime(){
        this.updatedTime = LocalDateTime.now();
    }
}
