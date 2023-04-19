package com.notfound4.Answer.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class AnswerDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        private String name;
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long answerId;
        private String content;
    }
}
