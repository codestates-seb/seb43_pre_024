package com.notfound4.Answer.Repository;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Question.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Spliterator;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    //Optional<Question> findByQuestionId(Long questionId);
    //Optional<Member> findByMemberId(Long memberId);
}
