package com.notfound4.Answer.Controller;

import com.notfound4.Answer.Dto.AnswerDto;
import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Mapper.AnswerMapper;
import com.notfound4.Answer.Service.AnswerService;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.Service.MemberService;
import com.notfound4.Question.Entity.Question;
import com.notfound4.Question.Service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/questions")
public class AnswerController {

    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final AnswerMapper mapper;
    private final AnswerService service;
    private final MemberService memberService;
    private final QuestionService questionService;

    public AnswerController(AnswerMapper mapper, AnswerService service, MemberService memberService, QuestionService questionService) {
        this.mapper = mapper;
        this.service = service;
        this.memberService = memberService;
        this.questionService = questionService;
    }

    // 답변 등록
    @PostMapping("/{question_id}/answer")
    public ResponseEntity answerPost(@PathVariable("question_id") long questionId,
                                     @RequestBody AnswerDto.Post postAnswer) {

        Question findQuestion = questionService.findQuestion(questionId);
        Member findMember = memberService.findMember(postAnswer.getEmail());
        Answer answer = mapper.postAnswerToAnswer(postAnswer, findQuestion, findMember);
        service.createAnswer(answer);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.created(location).build();
    }

    // 답변 수정
    @PatchMapping("/{question_id}/answer/edit")
    public ResponseEntity answerPatch(@PathVariable("question_id") long questionId,
                                      @RequestBody AnswerDto.Patch patchAnswer) {

        Member findMember = memberService.findMember(patchAnswer.getEmail());
        Answer answer = mapper.patchAnswerToAnswer(patchAnswer, findMember);
        service.updateAnswer(answer);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.ok().location(location).build();
    }

    // 답변 삭제
    @DeleteMapping("/{question_id}/answer/{answer_id}")
    public ResponseEntity answerDelete(@PathVariable("question_id") long questionId,
                                       @PathVariable("answer_id") long answerId) {

        service.deleteAnswer(answerId);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.ok().location(location).build();
    }
}
