package com.notfound4.Question.Service;

import com.notfound4.Question.Entity.Question;
import com.notfound4.Question.Repository.LikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class LikeService {
    private final LikeRepository repository;

    public LikeService(LikeRepository repository) {
        this.repository = repository;
    }

    // 좋아요 갯 수 카운트
    public int likes(Question question) {
        return repository.countByQuestion(question);
    }
}
