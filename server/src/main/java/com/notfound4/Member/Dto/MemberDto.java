package com.notfound4.Member.Dto;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Question.Entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank
        private String name;

        @Email
        @NotBlank
        private String email;

        @NotBlank
        private String password;

    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
    // 유효성 추가하기
        private long memberId;
        private String email; // 본인확인 위해 필요
        private String name;
        private String password;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Delete {
        // 유효성 추가하기
        private long memberId;
        private String email; // 본인확인 위해 필요
        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long memberId;
        private String name;
        private String email;
        private String password;
        private Member.Status memberStatus;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class GetResponse {
//        private long memberId;
        private String email;
        private String name;
        private List<MyPageQuestion> questions;
        private List<MyPageAnswer> answers;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class MyPageQuestion {
        private Long questionId;
        private String title;
        private int likes;
        private int answer_cnt;
        private int views;
        private LocalDateTime created_at;
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class MyPageAnswer {
        private Long questionId;
        private String title;
        private int likes;
        private int answer_cnt;
        private int views;
        private LocalDateTime created_at;
    }
}
