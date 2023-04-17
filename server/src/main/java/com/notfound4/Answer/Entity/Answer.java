package com.notfound4.Answer.Entity;

import com.notfound4.Member.Entity.Member;
import com.notfound4.Question.Entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;  // 답변 ID

    @Column
    @ManyToOne
    @JoinColumn(name = "questionId")
    private Question question;    // 질문 ID, 질문 매핑

    @Column
    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;  // 멤버 ID, 멤버 매핑

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content; // 답변 내용

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;    // 답변 생성 시간

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt;   // 답변 수정 시간
}
