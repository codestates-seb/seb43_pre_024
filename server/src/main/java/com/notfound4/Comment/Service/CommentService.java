package com.notfound4.Comment.Service;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Repository.AnswerRepository;
import com.notfound4.Comment.Entity.Comment;
import com.notfound4.Comment.Repository.CommentRepository;
import com.notfound4.Question.Entity.Question;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class CommentService {

    private final CommentRepository repository;
    private final AnswerRepository answerRepository;

    public CommentService(CommentRepository repository, AnswerRepository answerRepository) {
        this.repository = repository;
        this.answerRepository = answerRepository;
    }

    public void createComment(Comment comment) {
        repository.save(comment);
    }

    public void updateComment(Comment comment) {
        Optional<Comment> optionalComment = repository.findById(comment.getCommentId());
        Comment findComment = optionalComment.orElseThrow(() -> new RuntimeException("not found comment"));

        String findCommentEmail = findComment.getMember().getEmail();
        String commentEmail = comment.getMember().getEmail();

        if (findCommentEmail.equals(commentEmail)) {
            findComment.setContent(comment.getContent());
        } else new RuntimeException("401 Unauthorized");

        repository.save(findComment);
    }

    public void deleteComment(long answerId, long commentId) {
        Optional<Comment> optionalComment = repository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new RuntimeException("not found comment"));

        if (answerId == findComment.getAnswer().getAnswerId()) {
            repository.deleteById(commentId);
        } else new RuntimeException("403 Forbidden");
    }

    public List<Comment> findComments(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new RuntimeException("not found answer"));

        return repository.findByAnswerId(findAnswer);
    }
}
