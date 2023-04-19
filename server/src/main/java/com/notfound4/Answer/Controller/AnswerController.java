package com.notfound4.Answer.Controller;

import com.notfound4.Answer.Dto.AnswerDto;
import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Mapper.AnswerMapper;
import com.notfound4.Answer.Service.AnswerService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/questions")
public class AnswerController {

    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final AnswerService service;
    private final AnswerMapper mapper;

    public AnswerController(AnswerService service, AnswerMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping("/{question_id}/answer")
    public ResponseEntity answerPost(@PathVariable("question_id") long questionId,
                                     @RequestBody AnswerDto.Post postAnswer) {

        // todo : 질문ID, 멤버ID 셋팅 필요
        Answer answer = mapper.postAnswerToAnswer(postAnswer);
        service.createAnswer(answer, questionId);

        URI location = UriComponentsBuilder
                                    .newInstance()
                                    .path(QUESTION_DEFAULT_URL + "/{question_id}")
                                    .buildAndExpand(questionId)
                                    .toUri();

        return ResponseEntity.created(location).build(); // 질문 확인 페이지 /questions/{question_id} 리다이렉션
    }

    @PatchMapping("/{question_id}/answer/edit")
    public ResponseEntity answerPatch(@PathVariable("question_id") long questionId,
                                      @RequestBody AnswerDto.Patch patchAnswer) {

        Answer answer = mapper.patchAnswerToAnswer(patchAnswer);
        service.updateAnswer(answer);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return new ResponseEntity<>(location, HttpStatus.OK); // 질문 확인 페이지 /questions/{question_id} 리다이렉션
    }

    @DeleteMapping("/{question_id}/answer/{answer_id}")
    public ResponseEntity answerDelete(@PathVariable("question_id") long questionId,
                                       @PathVariable("answer_id") long answerId) {

        service.deleteAnswer(answerId);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return new ResponseEntity<>(location, HttpStatus.OK);
    }
}
