package com.notfound4.Comment.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;


public class CommentDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @Email
        private String email;
        @NotBlank
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long commentId;
        @Email
        private String email;
        @NotBlank
        private String content;
    }

    @Getter
    @Setter
    public static class Response {
        private long commentId;
        private String name;
        private String content;
        private LocalDateTime created_at;
    }
}
