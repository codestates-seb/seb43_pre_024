package com.notfound4.Answer.Service;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Repository.AnswerRepository;
import com.notfound4.Question.Entity.Question;
import com.notfound4.Question.Repository.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class AnswerService {
    private final AnswerRepository repository;
    private final QuestionRepository questionRepository;

    public AnswerService(AnswerRepository repository, QuestionRepository questionRepository) {
        this.repository = repository;
        this.questionRepository = questionRepository;
    }

    // 답변 등록
    public void createAnswer(Answer answer) {
        repository.save(answer);
    }

    // 답변 수정 시, 등록된 답변 email, 수정 시 요청된 email 비교
    public void updateAnswer(Answer answer) {
        Optional<Answer> optionalAnswer = repository.findById(answer.getAnswerId());
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new RuntimeException("not found answer"));

        String findAnswerEmail = findAnswer.getMember().getEmail();
        String answerEmail = answer.getMember().getEmail();

        if (findAnswerEmail.equals(answerEmail)) {
            findAnswer.setContent(answer.getContent());
        } else new RuntimeException("403 Forbidden");

        repository.save(findAnswer);
    }

    // 답변 삭제
    public void deleteAnswer(long answerId) {
        Optional<Answer> optionalAnswer = repository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new RuntimeException("not found answer"));

        repository.deleteById(answerId);
    }

    // 댓글 등록 시, 해당 answer 찾기
    public Answer findAnswer(long answerId) {
        Optional<Answer> optionalAnswer = repository.findById(answerId);
        return optionalAnswer.orElseThrow(() -> new RuntimeException("not found answer"));
    }

    // 질문 확인 페이지 조회 시, 질문에 대한 답변 리스트 가져오기
    public List<Answer> findAnswers(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new RuntimeException("not found question"));

        return repository.findByQuestionId(findQuestion);
    }

    // 답변 갯수
    public int answers(Question question) {
        return repository.countByQuestionId(question);
    }
}
