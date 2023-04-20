package com.notfound4.Question.Dto;

import lombok.Getter;

import java.util.List;

// 질문 리스트 시, 리턴 할 데이터 questions 로 래핑할 Dto
@Getter
public class QuestionsDto<T> {
    private List<T> questions;

    public QuestionsDto(List<T> questions) {
        this.questions = questions;
    }
}
