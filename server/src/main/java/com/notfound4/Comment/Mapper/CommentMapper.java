package com.notfound4.Comment.Mapper;

import com.notfound4.Answer.Dto.AnswerDto;
import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Comment.Dto.CommentDto;
import com.notfound4.Comment.Entity.Comment;
import com.notfound4.Member.Entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    default Comment postCommentToComment(CommentDto.Post postComment, Member member, Answer answer) {
        Comment comment = new Comment();
        comment.setMember(member);
        comment.setAnswer(answer);
        comment.setContent(postComment.getContent());
        return comment;
    }

    default Comment patchCommentToComment(CommentDto.Patch patchComment, Member member, Answer answer) {
        Comment comment = new Comment();
        comment.setCommentId(patchComment.getCommentId());
        comment.setMember(member);
        comment.setAnswer(answer);
        comment.setContent(patchComment.getContent());
        return comment;
    }

    default CommentDto.Response commentToCommentResponse(Comment comment) {
        CommentDto.Response response = new CommentDto.Response();
        response.setCommentId(comment.getCommentId());
        response.setName(comment.getMember().getName());
        response.setContent(comment.getContent());
        response.setCreated_at(comment.getCreatedAt());
        return response;
    }

    default List<CommentDto.Response> commentsToCommentsResponse(List<Comment> commentList) {
        List<CommentDto.Response> responseList = new ArrayList<>();
        Iterator commentObj = responseList.iterator();

        while (commentObj.hasNext()) {
            Comment comment = (Comment) commentObj.next();
            responseList.add(this.commentToCommentResponse(comment));
        }

        return responseList;
    }
}
