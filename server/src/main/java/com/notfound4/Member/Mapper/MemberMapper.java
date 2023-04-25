package com.notfound4.Member.Mapper;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Service.AnswerService;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.Dto.MemberDto;
import com.notfound4.Question.Entity.Like;
import com.notfound4.Question.Entity.Question;
import com.notfound4.Question.Repository.QuestionRepository;
import com.notfound4.Question.Service.QuestionLikeService;
import com.notfound4.Question.Service.QuestionService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MemberMapper {


    public Member memberPostToMember(MemberDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setName( requestBody.getName() );
        member.setEmail( requestBody.getEmail() );
        member.setPassword( requestBody.getPassword() );

        return member;
    }


    public Member memberPatchToMember(MemberDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setName( requestBody.getName() );
        member.setMemberId( requestBody.getMemberId() );
        member.setPassword( requestBody.getPassword() );
        member.setEmail( requestBody.getEmail() );

        return member;
    }

    public Member memberDeleteToMember(MemberDto.Delete requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();


        member.setMemberId( requestBody.getMemberId() );
        member.setEmail( requestBody.getEmail() );

        return member;
    }


    public MemberDto.Response memberToMemberResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        long memberId = 0L;
        String name = null;
        String email = null;
        String password = null;
        Member.Status memberStatus = null;


        if ( member.getMemberId() != null ) {
            memberId = member.getMemberId();
        }
        name = member.getName();
        email = member.getEmail();
        password = member.getPassword();
        memberStatus = member.getStatus();

        MemberDto.Response response = new MemberDto.Response( memberId, email, name, password, memberStatus);

        return response;
    }

//    public MemberDto.MyPageQuestion questionToMyPageQuestion(Question question, AnswerService answerService, QuestionLikeService likeService) {
//        MemberDto.MyPageQuestion myPageQuestion = new MemberDto.MyPageQuestion();
//        myPageQuestion.setQuestionId(question.getQuestionId());
//        myPageQuestion.setTitle(question.getTitle());
//        myPageQuestion.setLikes(likeService.likes(question));
//        myPageQuestion.setAnswer_cnt(answerService.answers(question));
//        myPageQuestion.setViews(question.getViews());
//        myPageQuestion.setCreated_at(question.getCreatedAt());
//        return myPageQuestion;
//    }

    public List<MemberDto.MyPageQuestion> questionToMyPageQuestion(List<Question> myPageQuestions, AnswerService answerService, QuestionLikeService likeService) {
        List<MemberDto.MyPageQuestion> myPageQuestionsResponse = new ArrayList<>();
        for (Question question : myPageQuestions) {
            MemberDto.MyPageQuestion myPageQuestion = new MemberDto.MyPageQuestion();
            myPageQuestion.setQuestionId(question.getQuestionId());
            myPageQuestion.setTitle(question.getTitle());
            myPageQuestion.setLikes(likeService.likes(question));
            myPageQuestion.setAnswer_cnt(answerService.answers(question));
            myPageQuestion.setViews(question.getViews());
            myPageQuestion.setCreated_at(question.getCreatedAt());
            myPageQuestionsResponse.add(myPageQuestion);
        }
        return myPageQuestionsResponse;
    }

    public List<MemberDto.MyPageAnswer> questionToMyPageAnswer(List<Answer> myPageAnswers, QuestionRepository questionRepository, AnswerService answerService, QuestionLikeService likeService) {
        List<Question> myPageQuestions = myPageAnswers.stream()
                .map(answer -> questionRepository.findById(answer.getQuestion().getQuestionId()).get())
                .collect(Collectors.toList());
        List<MemberDto.MyPageAnswer> myPageAnswersResponse = new ArrayList<>();
        for (Question question : myPageQuestions) {
            MemberDto.MyPageAnswer myPageAnswer = new MemberDto.MyPageAnswer();
            myPageAnswer.setQuestionId(question.getQuestionId());
            myPageAnswer.setTitle(question.getTitle());
            myPageAnswer.setLikes(likeService.likes(question));
            myPageAnswer.setAnswer_cnt(answerService.answers(question));
            myPageAnswer.setViews(question.getViews());
            myPageAnswer.setCreated_at(question.getCreatedAt());
            myPageAnswersResponse.add(myPageAnswer);
        }
        return myPageAnswersResponse;
    }

//    public MemberDto.MyPageAnswer questionToMyPageAnswer(Question question, AnswerService answerService, QuestionLikeService likeService) {
//        MemberDto.MyPageAnswer myPageAnswer = new MemberDto.MyPageAnswer();
//        myPageAnswer.setQuestionId(question.getQuestionId());
//        myPageAnswer.setTitle(question.getTitle());
//        myPageAnswer.setLikes(likeService.likes(question));
//        myPageAnswer.setAnswer_cnt(answerService.answers(question));
//        myPageAnswer.setViews(question.getViews());
//        myPageAnswer.setCreated_at(question.getCreatedAt());
//        return myPageAnswer;
//    }

    public MemberDto.GetResponse setGetResponse(List<MemberDto.MyPageQuestion> myPageQuestions, List<MemberDto.MyPageAnswer> myPageAnswers, Member member) {
        MemberDto.GetResponse getResponse = new MemberDto.GetResponse();
        getResponse.setEmail(member.getEmail());
        getResponse.setName(member.getName());
        getResponse.setQuestions(myPageQuestions);
        getResponse.setAnswers(myPageAnswers);
        return getResponse;
    }

}
