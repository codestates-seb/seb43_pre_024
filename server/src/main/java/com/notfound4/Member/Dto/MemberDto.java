package com.notfound4.Member.Dto;

import com.notfound4.Member.Entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

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
        private String name;
        private String password;

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
}
