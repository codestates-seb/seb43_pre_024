package com.notfound4.Question.Controller;

import com.notfound4.Answer.Dto.AnswerDto;
import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Mapper.AnswerMapper;
import com.notfound4.Answer.Service.AnswerService;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.Service.MemberService;
import com.notfound4.Question.Dto.QuestionDto;
import com.notfound4.Question.Dto.QuestionsDto;
import com.notfound4.Question.Entity.Question;
import com.notfound4.Question.Mapper.QuestionMapper;
import com.notfound4.Question.Service.LikeService;
import com.notfound4.Question.Service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.xml.stream.events.Comment;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final QuestionMapper mapper;
    private final AnswerMapper answerMapper;
    private final QuestionService service;
    private final MemberService memberService;
    private final LikeService likeService;
    private final AnswerService answerService;

    public QuestionController(QuestionMapper mapper,
                              AnswerMapper answerMapper,
                              QuestionService service,
                              MemberService memberService,
                              LikeService likeService,
                              AnswerService answerService) {
        this.mapper = mapper;
        this.answerMapper = answerMapper;
        this.service = service;
        this.memberService = memberService;
        this.likeService = likeService;
        this.answerService = answerService;
    }

    // 질문 리스트(Total)
    @GetMapping
    public ResponseEntity getQuestions() {
        List<Question> questionList = service.findQuestions();
        // questions 응답 데이터로 매핑
        List<QuestionDto.Get> getQuestionList = mapper.questionsToGetQuestions(questionList, likeService, answerService);
        // questions 로 래핑해서 데이터 리턴
        return new ResponseEntity<>(new QuestionsDto<>(getQuestionList), HttpStatus.OK);
    }

    // 질문 리스트 정렬 - Hot, Top, New 정렬
    @GetMapping("/sort")
    public ResponseEntity getQuestionsSort(@RequestParam("tab") String tab) {
        List<Question> questionList = service.findQuestions(tab);
        List<QuestionDto.Get> getQuestionList = mapper.questionsToGetQuestions(questionList, likeService, answerService);
        return new ResponseEntity<>(new QuestionsDto<>(getQuestionList), HttpStatus.OK);
    }

    // 질문 검색 - 아직 구현 못함, 질문 리스트 (Total) 과 동일 구현
    @PostMapping("/search")
    public ResponseEntity postQuestionsTitle(@RequestParam("title") String title) {
        List<Question> questionList = service.findQuestions();
        List<QuestionDto.Get> getQuestionList = mapper.questionsToGetQuestions(questionList, likeService, answerService);

        return new ResponseEntity<>(getQuestionList, HttpStatus.OK);
    }

    // 질문 등록
    @PostMapping("/ask")
    public ResponseEntity postQuestion(@RequestBody QuestionDto.Post postQuestion) {
        // email 통해서 해당 member 찾아옴
        Member findMember = memberService.findMember(postQuestion.getEmail());
        // 저장할 질문 매핑
        Question question = mapper.postQuestionToQuestion(postQuestion, findMember);
        // 질문 저장
        service.createQuestion(question);
        // 질문 저장 후 /questions/x  페이지로 리다이렉션할 URI 생성
        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(question.getQuestionId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    // 질문 확인 페이지 조회
    @GetMapping("/{question_id}")
    public ResponseEntity getQuestion(@PathVariable("question_id") long questionId) {
        // 질문 조회 서비스 - 조회 수 추가 로직 포함
        Question question = service.findQuestion(questionId);

        // 해당 질문 좋아요 갯수 가져오기
        int likes = likeService.likes(question);

        // 해당 질문 답변 리스트 가져오기
        List<Answer> answerList = answerService.findAnswers(questionId);
        // 리턴 할 Dto 로 답변 리스트 매핑
        List<AnswerDto.Response> answerListResponse = answerMapper.answerToAnswerListResponse(answerList);
        // 리턴 할 댓글 리스트
        List<Comment> commentList = new ArrayList<>();
        // 리턴할 질문 확인 조회 Dto 로 매핑
        QuestionDto.getResponse response =
                mapper.questionToGetResponseQuestion(question, likes, answerListResponse, commentList);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 질문 수정
    @PatchMapping("/{question_id}/edit")
    public ResponseEntity patchQuestion(@PathVariable("question_id") long questionId,
                                        @RequestBody QuestionDto.Patch patchQuestion) {
        // 질문 수정 리퀘스트 바디로 데이터 받아서 question 매핑
        Question question = mapper.patchQuestionToQuestion(patchQuestion);
        // 질문 수정 시, email 을 파라미터로 던져서 email 확인
        service.updateQuestion(question, patchQuestion.getEmail());
        // 수정 완료 시, 리턴할 uri 생성  /question/x : 질문 확인 페이지
        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.ok().location(location).build();
    }

    // 질문 삭제
    @DeleteMapping("/{question_id}")
    public ResponseEntity deleteQuestion(@PathVariable("question_id") long questionId) {
        service.deleteQuestion(questionId);

        // 질문 삭제 후, 리턴 할 /questions - 질문 리스트 (Total) Uri 생성
        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL)
                .build()
                .toUri();

        return ResponseEntity.ok().location(location).build();
    }

    // 질문 좋아요 기능 미구현
    @PostMapping("/{question_id}/like")
    public void postQuestionLike() {
    }

    // 질문 답변 채택 기능 미구현
}
