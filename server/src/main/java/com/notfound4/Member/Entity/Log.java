package com.notfound4.Member.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long log_id;     //로그ID
    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;     //Member - 멤버ID와 매핑
    @Column(nullable = false)
    private Long login;     //로그인/아웃 구분 (1:로그인, 2:로그아웃)
    @Column
    @CreatedDate
    private LocalDateTime date;     //로그인/로그아웃 시간
}
