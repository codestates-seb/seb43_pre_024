package com.notfound4.Member.service;


import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {

        this.memberRepository = memberRepository;

    }

    // 예외 처리
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());


        return memberRepository.save(member);
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            // 예외처리 수정
            throw new RuntimeException("Member Not Found");
    }
}
