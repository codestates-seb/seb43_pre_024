package com.notfound4.Question.Dto;

import com.notfound4.Answer.Dto.AnswerDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {

    // 질문 등록 시 받을 Dto
    @Getter
    @AllArgsConstructor
    public static class Post {
        private String email;
        private String title;
        private String content;
    }

    // 질문 수정 시 받을 Dto
    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long questionId;
        private String email;
        private String title;
        private String content;
    }

    // 질문 리스트 (Total) 조회 시, 리턴 할 Dto
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Get {
        private long questionId;
        private String title;
        private String content;
        private String name;
        private int likes;
        private int answer_cnt;
        private int views;
        private LocalDateTime created_at;
    }

    // 질문 확인 페이지 조회 시, 리턴 할 Dto
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class getResponse {
        private long questionId;
        private String title;
        private String content;
        private Long memberId;
        private String name;
        private int likes;
        private int views;
        private LocalDateTime created_at;
        private LocalDateTime modified_at;
        private Long accepted_answer;
        private List<AnswerDto.Response> answerList;

    }
}
