package com.notfound4.Question.Entity;

import com.notfound4.Member.Entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long like_id;     //투표ID
    @ManyToOne
    @JoinColumn(name = "questionId")
    private Question question;  //질문ID기준 (QUESTIONS와 1:N 매핑)
    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;      //멤버ID기준 (MEMBER와 1:N 매핑)
}
