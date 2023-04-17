package com.notfound4.Question.Entity;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Member.Entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;     //질문ID
    @Column
    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;     //멤버ID
    @Column
    private String title;     //질문 제목
    @Column(columnDefinition = "TEXT")
    private String content;     //질문 내용
    @Column
    @CreatedDate
    private LocalDateTime createdAt;     //생성 시간
    @Column
    @LastModifiedDate
    private LocalDateTime modifiedAt;     //수정 시간
    @Column
    private Integer views;     //조회수
    @Column
    private Long acceptedAnswerId;     //채택된 답변

    @OneToMany(mappedBy = "question")
    private List<Answer> answerList = new ArrayList<>();
}
