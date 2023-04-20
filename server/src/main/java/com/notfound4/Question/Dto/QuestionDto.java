package com.notfound4.Question.Dto;

import com.notfound4.Answer.Dto.AnswerDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.xml.stream.events.Comment;
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
        private boolean accepted_answer;
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
        private String name;
        private int likes;
        private LocalDateTime created_at;
        private LocalDateTime modified_at;
        private List<AnswerDto.Response> answerList;
        private List<Comment> commentList;
    }

    // 질문 확인 페이지 조회 시, 리턴할 Dto 에 포함될 댓글 Dto
    @Getter
    @AllArgsConstructor
    public static class comment {
        private int commentId;
        private String name;
        private String content;
        private LocalDateTime created_at;
    }
}
