package com.notfound4.Answer.Repository;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Question.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    // 질문 리스트 조회 시, 답변 갯수 카운트
    @Query(value = "select count(*) from Answer an where an.question = :question")
    int countByQuestionId(Question question);

    // 질문 확인 페이지 조회 시, 해당 질문에 대한 답변 리스트
    @Query(value = "from Answer an where an.question = :question")
    List<Answer> findByQuestionId(Question question);

    // 마이페이지 답변 조회 시, 내가 남긴 답변 리스트
    @Query(value = "SELECT * FROM answer WHERE member_id = :memberId ORDER BY created_at DESC", nativeQuery = true)
    List<Answer> findByMemberId(long memberId);
}
