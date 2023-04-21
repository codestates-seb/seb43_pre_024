package com.notfound4.Comment.Repository;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Comment.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "from Comment c where c.answer = :answer")
    List<Comment> findByAnswerId(Answer answer);
}
