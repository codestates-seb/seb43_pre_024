package com.notfound4.Member.Service;


import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Repository.AnswerRepository;
import com.notfound4.Answer.Service.AnswerService;
import com.notfound4.Member.Dto.MemberDto;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.Mapper.MemberMapper;
import com.notfound4.Member.Repository.MemberRepository;
import com.notfound4.Question.Entity.Question;
import com.notfound4.Question.Repository.QuestionRepository;
import com.notfound4.Question.Service.QuestionLikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final QuestionRepository questionRepository;
    private final AnswerService answerService;
    private final QuestionLikeService likeService;
    private final MemberMapper memberMapper;
    private final AnswerRepository answerRepository;


    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, QuestionRepository questionRepository, AnswerService answerService, QuestionLikeService likeService, MemberMapper memberMapper, AnswerRepository answerRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.questionRepository = questionRepository;
        this.answerService = answerService;
        this.likeService = likeService;
        this.memberMapper = memberMapper;
        this.answerRepository = answerRepository;
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

    public ResponseEntity findMyPage(long memberId) {
        // 내 질문 목록 리스트
        List<Question> findQuestions = questionRepository.findQuestionsByMemberId(memberId).get();
        // 내 질문 목록 dto 리스트
        List<MemberDto.MyPageQuestion> myPageQuestions = memberMapper.questionToMyPageQuestion(findQuestions, answerService, likeService);

        // 내 답변 목록 리스트
        List<Answer> findAnswersByQuestions = answerRepository.findByMemberId(memberId);
        // 내 답변 목록 dto 리스트
        List<MemberDto.MyPageAnswer> myPageAnswers = memberMapper.questionToMyPageAnswer(findAnswersByQuestions, questionRepository, answerService, likeService);
        // 마이페이지 조회 dto 생성
        MemberDto.GetResponse getResponses = memberMapper.setGetResponse(myPageQuestions, myPageAnswers, findMemberById(memberId));
        return new ResponseEntity(getResponses, HttpStatus.OK);
    }

    // AnswerController, QuestionController 전용 멤버 조회 (parameter가 email이기 떄문)
    public Member findMember(String email) {
        return findVerifiedMember(email);
    }

    public boolean isVerifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isEmpty()) {
            Member member = new Member();
            member.setEmail(email);
            member.setName("USER_" + System.currentTimeMillis());
            member.setPassword(email + System.currentTimeMillis());
            createMember(member);
            return false;
        }
        return true;
    }
    // status만 lock으로 변경후 저장
    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        // memberStatus가 active가 아닐시 예외처리
        if (findMember.getStatus() != Member.Status.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Member already lock");
        }
        findMember.setStatus(Member.Status.LOCK);
        memberRepository.save(findMember);
    }

    private Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));
        return findMember;
    }

    private Member findVerifiedMember(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));
        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            // 예외처리 수정
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Member Exists");
    }


    public Member findMemberById(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member Not Found"));
    }

}
