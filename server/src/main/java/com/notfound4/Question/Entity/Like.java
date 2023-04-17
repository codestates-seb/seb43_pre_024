package com.notfound4.Question.Entity;

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
    @Column
    private Long question_id;     //질문ID    (QUESTIONS와 1:N 매핑)
    @Column
    private Long member_id;     //멤버ID (MEMBER와 1:N 매핑)
}
