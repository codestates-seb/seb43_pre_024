package com.notfound4.Member.Controller;



import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.Dto.MemberDto;
import com.notfound4.Member.Mapper.MemberMapper;
import com.notfound4.Member.Service.MemberService;
import com.notfound4.Question.Entity.Question;
import com.notfound4.QuestionResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService,
                            MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {

        Member createdMember = memberService.createMember(mapper.memberPostToMember(requestBody));

        URI location = UriComponentsBuilder
                .newInstance()
                .path("/{member-id}")
                .buildAndExpand(createdMember.getMemberId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{user-id}")
    public ResponseEntity patchMember(@PathVariable("user-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);
        Member updatedMember = memberService.updateMember(mapper.memberPatchToMember(requestBody));


        return new ResponseEntity(mapper.memberToMemberResponse(updatedMember), HttpStatus.OK);
    }

    @GetMapping("/{user-id}")
    public ResponseEntity getMember(@PathVariable("user-id") @Positive long memberId) {
        Member findMember = memberService.findMember(memberId);
        return new ResponseEntity(mapper.memberToMemberResponse(findMember), HttpStatus.OK);
    }

    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteMember(@PathVariable("user-id") @Positive long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.OK);
    }

    // 마이페이지 질문 목록 조회
    @GetMapping("/{user-id}/question")
    public ResponseEntity getMyQuestions(@PathVariable("user-id") @Positive long memberId) {
        List<Question> findMyQuestions = memberService.findMyQuestions(memberId);
        List<QuestionResponseDto> responses = new ArrayList<>();
        for (Question question : findMyQuestions) {
            QuestionResponseDto response = new QuestionResponseDto();
            response.setQuestion_id(question.getQuestionId());
            response.setTitle(question.getTitle());
            response.setContent(question.getContent());
            response.setAccepted_answer_id(question.getAcceptedAnswerId());
            response.setMember_id(question.getMember().getMemberId());
            response.setViews(question.getViews());
            responses.add(response);
        }
        return new ResponseEntity(responses, HttpStatus.OK);
    }
}
