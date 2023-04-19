package com.notfound4.Member.mapper;

import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.dto.MemberDto;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {


    public Member memberPostToMember(MemberDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setName( requestBody.getName() );
        member.setEmail( requestBody.getEmail() );
        member.setPassword( requestBody.getPassword() );

        return member;
    }


    public Member memberPatchToMember(MemberDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setName( requestBody.getName() );
        member.setMemberId( requestBody.getMemberId() );
        member.setPassword( requestBody.getPassword() );

        return member;
    }


    public MemberDto.Response memberToMemberResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        long memberId = 0L;
        String name = null;
        String email = null;
        String password = null;
        Member.Status memberStatus = null;


        if ( member.getMemberId() != null ) {
            memberId = member.getMemberId();
        }
        name = member.getName();
        email = member.getEmail();
        password = member.getPassword();
        memberStatus = member.getStatus();

        MemberDto.Response response = new MemberDto.Response( memberId, email, name, password, memberStatus);

        return response;
    }

}
