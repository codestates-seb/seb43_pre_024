package com.notfound4.Member.Service;


import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.Repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;

    }

    // 예외 처리
    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));

        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    // AnswerController, QuestionController 전용 멤버 조회 (parameter가 email이기 떄문)
    public Member findMember(String email) {
        return findVerifiedMember(email);
    }

    // status만 lock으로 변경후 저장
    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        // memberStatus가 active가 아닐시 예외처리
        if (findMember.getStatus() != Member.Status.ACTIVE) {
            throw new RuntimeException("Member already lock");
        }
        findMember.setStatus(Member.Status.LOCK);
        memberRepository.save(findMember);
    }

    private Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException("Member not found"));
        return findMember;
    }

    private Member findVerifiedMember(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(() -> new RuntimeException("Member not found"));
        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            // 예외처리 수정
            throw new RuntimeException("Member exists");
    }


}