package com.notfound4.Answer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@javax.persistence.Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;  // 답변 ID

    @Column
    private long questionId;    // 질문 ID, 질문 매핑

    @Column
    private long memberId;  // 멤버 ID, 멤버 매핑

    @Column
    private String content; // 답변 내용

    @Column
    private LocalDateTime createdAt;    // 답변 생성 시간

    @Column
    private LocalDateTime modifiedAt;   // 답변 수정 시간
}
