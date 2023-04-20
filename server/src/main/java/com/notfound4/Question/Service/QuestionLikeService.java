package com.notfound4.Question.Service;

import com.notfound4.Question.Entity.Question;
import com.notfound4.Question.Repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class QuestionLikeService {
    @Autowired
    private final LikeRepository likeRepository;


    public QuestionLikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    // 좋아요 갯 수 카운트
    public int likes(Question question) {
        return likeRepository.countByQuestion(question);
    }


}
