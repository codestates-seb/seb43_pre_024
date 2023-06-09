package com.notfound4.Member.Entity;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Comment.Entity.Comment;
import com.notfound4.Question.Entity.Like;
import com.notfound4.Question.Entity.Question;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 30, nullable = false)
    private String name;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(name = "profile_image")
    private byte[] profileImage;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Status status = Status.ACTIVE;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createAt;

    @LastModifiedDate
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt;

//    @ElementCollection(fetch = FetchType.EAGER)
//    private List<String> role = new ArrayList<>();

    // Answer 와 매핑
    @OneToMany(mappedBy = "member")
    private List<Answer> answerList = new ArrayList<>();

    // Question 와 매핑
    @OneToMany(mappedBy = "member")
    private List<Question> questionList = new ArrayList<>();

    // Log 와 매핑
    @OneToMany(mappedBy = "member")
    private List<Log> logList = new ArrayList<>();

    // Like 와 매핑
    @OneToMany(mappedBy = "member")
    private List<Like> likeList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> CommentList = new ArrayList<>();

    public enum Status {
        ACTIVE("활동중"),
        LOCK("휴면 상태");

        @Getter
        private String status;

        Status(String status) {
            this.status = status;
        }

    }
}
