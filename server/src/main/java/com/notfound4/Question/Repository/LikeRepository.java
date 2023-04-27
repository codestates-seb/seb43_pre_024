package com.notfound4.Question.Repository;

import com.notfound4.Question.Entity.Like;
import com.notfound4.Question.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    // 좋아요 갯수 카운트
    int countByQuestion(Question question);
}
