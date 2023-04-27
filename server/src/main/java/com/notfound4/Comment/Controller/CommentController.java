package com.notfound4.Comment.Controller;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Service.AnswerService;
import com.notfound4.Comment.Dto.CommentDto;
import com.notfound4.Comment.Entity.Comment;
import com.notfound4.Comment.Mapper.CommentMapper;
import com.notfound4.Comment.Service.CommentService;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.Service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.constraints.Positive;
import java.net.URI;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/questions")
public class CommentController {

    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final CommentMapper mapper;
    private final CommentService service;
    private final MemberService memberService;
    private final AnswerService answerService;

    @PostMapping("/{question_id}/answer/{answer_id}/comment")
    public ResponseEntity postComment(@PathVariable("question_id") @Positive long questionId,
                                      @PathVariable("answer_id") @Positive long answerId,
                                      @RequestBody CommentDto.Post postComment) {

        Member findMember = memberService.findMember(postComment.getEmail());
        Answer findAnswer = answerService.findAnswer(answerId);
        Comment comment = mapper.postCommentToComment(postComment, findMember, findAnswer);

        service.createComment(comment);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question_id}/answer/{answer_id}/comment/edit")
    public ResponseEntity patchComment(@PathVariable("question_id") @Positive long questionId,
                                       @PathVariable("answer_id") @Positive long answerId,
                                       @RequestBody CommentDto.Patch patchComment) {

        Member findMember = memberService.findMember(patchComment.getEmail());
        Answer findAnswer = answerService.findAnswer(answerId);
        Comment comment = mapper.patchCommentToComment(patchComment, findMember, findAnswer);

        service.updateComment(comment);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.ok().location(location).build();
    }

    @DeleteMapping("/{question_id}/answer/{answer_id}/comment/{comment_id}")
    public ResponseEntity deleteComment(@PathVariable("question_id") @Positive long questionId,
                                        @PathVariable("answer_id") @Positive long answerId,
                                        @PathVariable("comment_id") @Positive long commentId) {

        service.deleteComment(answerId, commentId);

        URI location = UriComponentsBuilder
                .newInstance()
                .path(QUESTION_DEFAULT_URL + "/{question_id}")
                .buildAndExpand(questionId)
                .toUri();

        return ResponseEntity.ok().location(location).build();
    }
}
