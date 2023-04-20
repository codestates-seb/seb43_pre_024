package com.notfound4.Question.Repository;

import com.notfound4.Question.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    // 질문 조회 시, 조회 수 업데이트
    @Query(value = "update Question q set q.views = :views where q.questionId = :questionId")
    Question updateByQuestionId(long questionId, int views);

    // 질문 리스트 정렬 시, 좋아요 순으로 쿼리 구현 못함
//    @Query(value = "select ")
//    List<Question> findAllByOrderByLikes();
}