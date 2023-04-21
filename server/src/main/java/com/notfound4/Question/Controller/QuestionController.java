package com.notfound4.Question.Controller;

import com.notfound4.Answer.Dto.AnswerDto;
import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Mapper.AnswerMapper;
import com.notfound4.Answer.Service.AnswerService;
import com.notfound4.Comment.Mapper.CommentMapper;
import com.notfound4.Comment.Service.CommentService;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.Service.MemberService;
import com.notfound4.Question.Dto.QuestionDto;
import com.notfound4.Question.Dto.QuestionsDto;
import com.notfound4.Question.Entity.Question;
import com.notfound4.Question.Mapper.QuestionMapper;
import com.notfound4.Question.Service.QuestionLikeService;
import com.notfound4.Question.Service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final QuestionMapper mapper;
    private final AnswerMapper answerMapper;
    private final QuestionService questionService;
    private final MemberService memberService;
    private final QuestionLikeService likeService;
    private final AnswerService answerService;
    private final QuestionLikeService questionLikeService;

    private final CommentService commentService;
    private final CommentMapper commentMapper;


    public QuestionController(QuestionMapper mapper, AnswerMapper answerMapper, QuestionService questionService, MemberService memberService, QuestionLikeService likeService, AnswerService answerService, QuestionLikeService questionLikeService, CommentService commentService, CommentMapper commentMapper) {
        this.mapper = mapper;
        this.answerMapper = answerMapper;
        this.questionService = questionService;
        this.memberService = memberService;
        this.likeService = likeService;
        this.answerService = answerService;
        this.questionLikeService = questionLikeService;
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    // 질문 리스트 조회
    @GetMapping
    public ResponseEntity<QuestionsDto> findAllQuestionList(
            @RequestParam(required = false) String sortInfo,
            @RequestParam(required = false) String searchId) {

        return questionService.findAllQuestionList(sortInfo, searchId);
    }

    // 질문 등록
    @PostMapping("/ask")
    public ResponseEntity postQuestion(@RequestBody QuestionDto.Post postQuestion) {
        // email 통해서 해당 member 찾아옴
        Member findMember = memberService.findMember(postQuestion.getEmail());
        // 저장할 질문 매핑
        Question question = mapper.postQuestionToQuestion(postQuestion, findMember);
        // 질문 저장
        questionService.createQuestion(question);
        // 질문 저장 후 /questions/x  페이지로 리다이렉션할 URI 생성
        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(question.getQuestionId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    // 질문 1개 조회
    @GetMapping("/{question_id}")
    public ResponseEntity getQuestion(@PathVariable("question_id") long questionId) {
        // 질문 조회 서비스 - 조회 수 추가 로직 포함
        Question question = questionService.findQuestion(questionId);

        // 해당 질문 좋아요 갯수 가져오기
        int likes = likeService.likes(question);

        // 해당 질문 답변 리스트 가져오기
        List<Answer> answerList = answerService.findAnswers(questionId);
        // 리턴 할 Dto 로 답변 리스트 매핑 (TODO: 나중에 삭제)
        //List<AnswerDto.Response> answerListResponse = answerMapper.answerToAnswerListResponse(answerList);

        List<AnswerDto.Response> answerListResponse = answerMapper.answerToAnswerListResponse(answerList, commentService, commentMapper);

        // 리턴할 질문 확인 조회 Dto 로 매핑
        QuestionDto.getResponse response =
                mapper.questionToGetResponseQuestion(question, likes, answerListResponse);


        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 질문 수정
    @PatchMapping("/{question_id}/edit")
    public ResponseEntity patchQuestion(@PathVariable("question_id") long questionId,
                                        @RequestBody QuestionDto.Patch patchQuestion) {
        // TODO :  질문한 사람만 질문 내용 수정할 수 있도록 Security 적용해야함
        // 추후 email로 확인하는 절차 삭제해야함


        // 질문 수정 리퀘스트 바디로 데이터 받아서 question 매핑
        Question question = mapper.patchQuestionToQuestion(patchQuestion);
        // 질문 수정 시, email 을 파라미터로 던져서 email 확인
        questionService.updateQuestion(question, patchQuestion.getEmail());
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
        // TODO: 질문한 사람만 삭제할 수 있도록 Security 적용

        questionService.deleteQuestion(questionId);

        // 질문 삭제 후, 리턴 할 /questions - 질문 리스트 (Total) Uri 생성
        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL)
                .build()
                .toUri();

        return ResponseEntity.ok().location(location).build();
    }

    // 질문 좋아요 기능
    @PostMapping("/{question_id}/like")
    public ResponseEntity<?> postQuestionLike(@PathVariable("question_id") Long questionId) {
        Long memberId = questionService.getMemberIdByQuestionId(questionId);

        // 좋아요 등록 로직 호출
        questionService.saveLike(questionId, memberId);


        // 좋아요 누른 뒤 /questions/{question_id} 페이지로 리다이렉션할 URI 생성
        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.created(location).build();
    }

    // 질문 좋아요 해제 기능
    @DeleteMapping("/{question_id}/like/{like_id}")
    public ResponseEntity<?> deleteLike(@PathVariable("question_id") Long questionId,
                                        @PathVariable("like_id") Long likeId) {
        questionService.removeLike(likeId);

        // 좋아요 해제 뒤 /questions/{question_id} 페이지로 리다이렉션할 URI 생성
        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.ok().location(location).build();
    }


    // 질문 답변 채택 기능
    @PostMapping("/{questionId}")
    public ResponseEntity<?> chooseAnswer(@PathVariable Long questionId, @RequestParam(required = false) Long answerId) {
        Long memberId = questionService.getMemberIdByQuestionId(questionId);
        // 질문한 사람만 답변할 수 있도록 Security 적용
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String currentUserName = authentication.getName();
//
//        if (!currentUserName.equals(memberId.toString())) {
//            throw new UnauthorizedException("You are not authorized to perform this action");
//        }

        questionService.chooseAnswer(questionId, answerId);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(location)
                .build();

    }


}

