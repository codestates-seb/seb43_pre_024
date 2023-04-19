package com.notfound4.Answer.Mapper;

import com.notfound4.Answer.Dto.AnswerDto;
import com.notfound4.Answer.Entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {

    default Answer postAnswerToAnswer(AnswerDto.Post answerPost) {
        Answer answer = new Answer();
        answer.setContent(answerPost.getContent());
        return answer;
    }

    default Answer patchAnswerToAnswer(AnswerDto.Patch answerPatch) {
        Answer answer = new Answer();
        answer.setAnswerId(answerPatch.getAnswerId());
        answer.setContent(answerPatch.getContent());
        return answer;
    }
}
