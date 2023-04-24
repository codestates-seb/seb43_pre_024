package com.notfound4.Answer.Dto;

import com.notfound4.Comment.Dto.CommentDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class AnswerDto {

    // 답변 등록 시, 받을 Dto
    @Getter
    @AllArgsConstructor
    public static class Post {
        @Email
        private String email;
        @NotBlank
        private String content;
    }

    // 답변 수정 시, 받을 Dto
    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long answerId;
        @Email
        private String email;
        @NotBlank
        private String content;
    }

    // 질문 확인 조회 시, 리턴 할 Dto 에 포함되는 답변 Dto
    @Getter
    @Setter
    public static class Response {
        private long answerId;
        private String name;
        private String content;
        private LocalDateTime created_at;
        private List<CommentDto.Response> commentList;
    }
}
