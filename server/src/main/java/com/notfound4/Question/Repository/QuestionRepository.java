package com.notfound4.Question.Repository;

import com.notfound4.Question.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query(value = "UPDATE question SET views = views + 1 WHERE question_id = :questionId", nativeQuery = true)
    void incrementViews(@Param("questionId") long questionId);

    // title에서 검색어로 find
    @Query("SELECT q FROM Question q WHERE q.title LIKE %:searchId%")
    List<Question> findByTitleContaining(@Param("searchId") String searchId);

    // 마이페이지 내 질문목록 조회
    @Query(value = "SELECT * FROM question WHERE member_id = :memberId ORDER BY created_at DESC", nativeQuery = true)
    Optional<List<Question>> findQuestionsByMemberId(long memberId);
}
