package com.notfound4.Member.controller;



import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.dto.MemberDto;
import com.notfound4.Member.mapper.MemberMapper;
import com.notfound4.Member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

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

    @PatchMapping("{user-id}")
    public ResponseEntity patchMember(@PathVariable("user-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);
        Member updatedMember = memberService.updateMember(mapper.memberPatchToMember(requestBody));


        return new ResponseEntity(mapper.memberToMemberResponse(updatedMember), HttpStatus.OK);
    }

    @GetMapping("{user-id}")
    public ResponseEntity getMember(@PathVariable("user-id") @Positive long memberId) {
        Member findMember = memberService.findMember(memberId);
        return new ResponseEntity(mapper.memberToMemberResponse(findMember), HttpStatus.OK);
    }

    @DeleteMapping("{user-id}")
    public ResponseEntity deleteMember(@PathVariable("user-id") @Positive long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
