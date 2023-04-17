package com.notfound4.Member.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@NoArgsConstructor
@Getter
@Setter
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long log_id;     //로그ID
    @Column
    private Long member_id;     //사용자ID
    @Column
    private Long login;     //로그인/로그아웃
    @Column
    private LocalDateTime date;     //로그인/로그아웃 시간
}
