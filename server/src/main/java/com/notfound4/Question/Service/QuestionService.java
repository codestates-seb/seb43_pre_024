package com.notfound4.Question.Service;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Repository.AnswerRepository;
import com.notfound4.Question.Entity.Like;
import com.notfound4.Question.Entity.Question;
import com.notfound4.Question.Repository.LikeRepository;
import com.notfound4.Question.Repository.QuestionRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class QuestionService {

    private final QuestionRepository repository;
    private final AnswerRepository answerRepository;
    private final LikeRepository likeRepository;

    public QuestionService(QuestionRepository repository, AnswerRepository answerRepository, LikeRepository likeRepository) {
        this.repository = repository;
        this.answerRepository = answerRepository;
        this.likeRepository = likeRepository;
    }

    // 질문 리스트 (Total) - questionId 로 오름차순 정렬
    public List<Question> findQuestions() {
        return repository.findAll(Sort.by("questionId").descending());
    }

    // 질문 리스트 (Total) - Hot, Top, New 정렬
    public List<Question> findQuestions(String tab) {
        List<Question> questionList;

        // Todo : Hot: 좋아요 순 작업 필요
        if (tab.equals("Hot")) {
            questionList = repository.findAll(Sort.by("questionId").descending());
        } else if (tab.equals("Top")) {
            questionList = repository.findAll(Sort.by("views").descending());
        } else {
            questionList = repository.findAll(Sort.by("questionId").descending());
        }

        return questionList;
    }

    // 질문 등록 시, 저장
    public void createQuestion(Question question) {
        repository.save(question);
    }

    // 질문 확인 페이지 조회 - 질문 조회
    public Question findQuestion(long questionId) {
        Optional<Question> optionalQuestion = repository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new RuntimeException("not found question"));

        // get 으로 질문 조회 시, 조회 수 추가
        findQuestion.setViews(findQuestion.getViews() + 1);
        // DB에 조회 수 업데이트 후, 해당 질문 리턴
        return repository.updateByQuestionId(findQuestion.getQuestionId(), findQuestion.getViews());
    }

    // 질문 수정
    public void updateQuestion(Question question, String email) {
        Optional<Question> optionalQuestion = repository.findById(question.getQuestionId());
        Question findQuestion = optionalQuestion.orElseThrow(() -> new RuntimeException("not found question"));

        // 질문 수정 때 받은 email 과 등록된 질문 email 비교 하여 같은 경우 제목, 본문 수정, 다를 경우 예외처리
        String findQuestionEmail = findQuestion.getMember().getEmail();
        if (findQuestionEmail.equals(email)) {
            findQuestion.setTitle(question.getTitle());
            findQuestion.setContent(question.getContent());
        } else new RuntimeException("403 Forbidden");

        // 수정 된 질문 저장
        repository.save(findQuestion);
    }

    // 질문 삭제
    public void deleteQuestion(long questionId) {
        Optional<Question> optionalQuestion = repository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new RuntimeException("not found question"));

        // 질문과 연결된 좋아요 삭제
        Iterator like = findQuestion.getLikeList().iterator();
        while (like.hasNext()) {
            Like findLike = (Like) like.next();
            likeRepository.deleteById(findLike.getLike_id());
        }

        // 질문과 연결 된 댓글 삭제 - 댓글 구현 시, 작성 필요

        // 질문에 대한 답변 삭제
        Iterator answer = findQuestion.getAnswerList().iterator();
        while (answer.hasNext()) {
            Answer findAnswer = (Answer) answer.next();
            answerRepository.deleteById(findAnswer.getAnswerId());
        }

        // 질문에 포함된 태그 삭제 - 태그 구현 시, 작성 필요

        // 질문 삭제
        repository.deleteById(questionId);
    }

}
