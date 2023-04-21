package com.notfound4.Question.Mapper;

import com.notfound4.Answer.Dto.AnswerDto;
import com.notfound4.Answer.Service.AnswerService;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Question.Dto.QuestionDto;
import com.notfound4.Question.Entity.Question;
import com.notfound4.Question.Service.QuestionLikeService;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    // 질문 리스트 (Total) - questions 에 각 question 매핑
    default QuestionDto.Get questionToGetQuestion(Question question, QuestionLikeService likeService, AnswerService answerService) {
        QuestionDto.Get getQuestion = new QuestionDto.Get();
        getQuestion.setQuestionId(question.getQuestionId());
        getQuestion.setTitle(question.getTitle());
        getQuestion.setContent(question.getContent());
        getQuestion.setName(question.getMember().getName());
        getQuestion.setLikes(likeService.likes(question));
        getQuestion.setAnswer_cnt(answerService.answers(question));
        //getQuestion.setAccepted_answer(question.getAcceptedAnswerId()!=null);
        getQuestion.setViews(question.getViews());
        getQuestion.setCreated_at(question.getCreatedAt());
        return getQuestion;
    }

    // 질문 리스트 (Total) - questions List 를 위에 함수로 각 question 매핑
    default List<QuestionDto.Get> questionsToGetQuestions(List<Question> question, QuestionLikeService likeService, AnswerService answerService) {
        List<QuestionDto.Get> response = new ArrayList<>();
        Iterator var = question.iterator();

        while (var.hasNext()) {
            Question getQuestion = (Question) var.next();
            response.add(this.questionToGetQuestion(getQuestion, likeService, answerService));
        }

        return response;
    }

    // 질문 등록 시, 받은 Dto 를 question 으로 매핑
    default Question postQuestionToQuestion(QuestionDto.Post postQuestion, Member member) {
        Question question = new Question();
        question.setMember(member);
        question.setTitle(postQuestion.getTitle());
        question.setContent(postQuestion.getContent());
        question.setViews(0);
        return question;
    }

    // 질문 확인 페이지 조회 시, 리턴 할 Dto 로 매핑
    default QuestionDto.getResponse questionToGetResponseQuestion(
            Question question, int likes, List<AnswerDto.Response> answerList) {
        QuestionDto.getResponse response = new QuestionDto.getResponse();
        response.setQuestionId(question.getQuestionId());
        response.setTitle(question.getTitle());
        response.setContent(question.getContent());
        response.setMemberId(question.getMember().getMemberId());
        response.setName(question.getMember().getName());
        response.setLikes(likes);
        response.setViews(question.getViews());
        response.setCreated_at(question.getCreatedAt());
        response.setModified_at(question.getModifiedAt());
        response.setAccepted_answer(question.getAcceptedAnswerId());
        response.setAnswerList(answerList);
        return response;
    }

    // 질문 수정 - 리퀘스트로 받은 Dto 를 question 으로 매핑
    default Question patchQuestionToQuestion(QuestionDto.Patch patchQuestion) {
        Question question = new Question();
        question.setQuestionId(patchQuestion.getQuestionId());
        question.setTitle(patchQuestion.getTitle());
        question.setContent(patchQuestion.getContent());
        return question;
    }
}
