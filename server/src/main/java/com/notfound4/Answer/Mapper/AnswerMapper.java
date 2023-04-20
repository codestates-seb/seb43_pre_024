package com.notfound4.Answer.Mapper;

import com.notfound4.Answer.Dto.AnswerDto;
import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Question.Entity.Question;
import org.hibernate.IdentifierLoadAccess;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {

    // 답변 등록 시, 받은 Dto 를 answer 로 매핑
    default Answer postAnswerToAnswer(AnswerDto.Post answerPost, Question question, Member member) {
        Answer answer = new Answer();
        answer.setQuestion(question);
        answer.setMember(member);
        answer.setContent(answerPost.getContent());
        return answer;
    }

    // 답변 수정 시, 받은 Dto 를 answer 로 매핑
    default Answer patchAnswerToAnswer(AnswerDto.Patch answerPatch, Member member) {
        Answer answer = new Answer();
        answer.setAnswerId(answerPatch.getAnswerId());
        answer.setMember(member);
        answer.setContent(answerPatch.getContent());
        return answer;
    }

    // 질문 확인 페이지 조회 시, 리턴 할 답변 리스트 Dto 로 각 매핑
    default AnswerDto.Response answerToAnswerResponse(Answer answer) {
        AnswerDto.Response response = new AnswerDto.Response();
        response.setAnswerId(answer.getAnswerId());
        response.setName(answer.getMember().getName());
        response.setContent(answer.getContent());
        response.setCreated_at(answer.getCreatedAt());

        return response;
    }

    // 질문 확인 페이지 조회 시, 리턴 할 답변 리스트 Dto 로 위 함수 이용해 각 매핑
    default List<AnswerDto.Response> answerToAnswerListResponse(List<Answer> answerList) {
        List<AnswerDto.Response> answerListResponse = new ArrayList<>(answerList.size());
        Iterator answerObj = answerList.iterator();

        while(answerObj.hasNext()) {
            Answer answer = (Answer) answerObj.next();
            answerListResponse.add(this.answerToAnswerResponse(answer));
        }

        return answerListResponse;
    }
}
