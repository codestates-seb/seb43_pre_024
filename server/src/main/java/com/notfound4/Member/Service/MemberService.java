package com.notfound4.Member.Service;

import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.Repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository repository;

    public MemberService(MemberRepository repository) {
        this.repository = repository;
    }

    public Member findMember(String email) {
        Optional<Member> OptionalMember =  repository.findByEmail(email);
        return OptionalMember.orElseThrow(() -> new RuntimeException("not found member"));
    }

    public Member findMemberById(Long memberId) {
        Optional<Member> optionalMember = repository.findById(memberId);
        return optionalMember.orElseThrow(() -> new RuntimeException("Member not found"));
    }
}
