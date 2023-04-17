package com.notfound4.Question.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;     //질문ID
    @Column
    private Long memberId;     //멤버ID
    @Column
    private String title;     //질문 제목
    @Column
    private String content;     //질문 내용
    @Column
    private LocalDateTime createdAt;     //생성 시간
    @Column
    private LocalDateTime modifiedAt;     //수정 시간
    @Column
    private Integer views;     //조회수
    @Column
    private Boolean acceptedAnswer;     //채택된 답변
}
