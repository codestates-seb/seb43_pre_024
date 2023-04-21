package com.notfound4.Answer.Entity;

import com.notfound4.Comment.Entity.Comment;
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
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;  // 답변 ID

    @ManyToOne
    @JoinColumn(name = "questionId", nullable = false)
    private Question question;    // Question - 질문 ID와 매핑

    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;  // Member - 멤버 ID와 매핑

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content; // 답변 내용

    @CreatedDate
    @Column
    private LocalDateTime createdAt;    // 답변 생성 시간

    @LastModifiedDate
    @Column
    private LocalDateTime modifiedAt;   // 답변 수정 시간

    @OneToMany(mappedBy = "member")
    private List<Comment> CommentList = new ArrayList<>();
}
