package com.notfound4.Answer.Service;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Repository.AnswerRepository;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Question.Entity.Question;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class AnswerService {
    // Todo : Member, Question repository 사용 필요?
//    private final MemberRepository memberRepository;
//    private final QuestionRepository questionRepository;
    private final AnswerRepository repository;

    public AnswerService(AnswerRepository repository) {
        this.repository = repository;
    }

    public Answer createAnswer(Answer answer, long questionId) {
//        Optional<Question> optionalQuestion = repository.findByQuestionId(questionId);
//        Question findQuestion = optionalQuestion.orElseThrow(() -> new RuntimeException("해당 질문 없음"));
//        answer.setQuestion(findQuestion);

//        Optional<Member> optionalMember = repository.findByMemberId(findQuestion.getMemberId());
//        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException("해당 멤버 없음"));
//        answer.setMember(findMember);

        Question question = new Question();
        question.setQuestionId(questionId);
        Member member = new Member();
        member.setMemberId(1L);

        answer.setQuestion(question);
        answer.setMember(member);

        return repository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Optional<Answer> optionalAnswer = repository.findById(answer.getAnswerId());
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new RuntimeException("해당 답변 없음"));

        return repository.save(answer);
    }

    public void deleteAnswer(long answerId) {
        Optional<Answer> optionalAnswer = repository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new RuntimeException("해당 답변 없음"));

        repository.deleteById(answerId);
    }
}
