package com.notfound4.Question.Service;

import com.notfound4.Answer.Entity.Answer;
import com.notfound4.Answer.Repository.AnswerRepository;
import com.notfound4.Answer.Service.AnswerService;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Member.Service.MemberService;
import com.notfound4.Question.Dto.QuestionDto;
import com.notfound4.Question.Dto.QuestionsDto;
import com.notfound4.Question.Entity.Like;
import com.notfound4.Question.Entity.Question;
import com.notfound4.Question.Mapper.QuestionMapper;
import com.notfound4.Question.Repository.LikeRepository;
import com.notfound4.Question.Repository.QuestionRepository;
import com.notfound4.Question.exception.BadRequestException;
import com.notfound4.Question.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Transactional
@Service
public class QuestionService {
    @Autowired
    private final QuestionRepository questionRepository;
    @Autowired
    private final AnswerRepository answerRepository;
    @Autowired
    private final LikeRepository likeRepository;

    @Autowired
    private QuestionLikeService likeService;
    @Autowired
    private AnswerService answerService;
    @Autowired
    private final MemberService memberService;


    @Autowired
    private QuestionMapper questionMapper;

    public QuestionService(QuestionRepository questionRepository, AnswerRepository answerRepository, LikeRepository likeRepository, MemberService memberService) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.likeRepository = likeRepository;
        this.memberService = memberService;
    }

    public ResponseEntity<QuestionsDto> findAllQuestionList(String sortInfo, String searchId) {
        // sortInfo가 null 이거나 비어있는 경우 기본값 설정
        if (sortInfo == null || sortInfo.isEmpty()) {
            sortInfo = "NEW";
        }

        List<Question> questionList;

        if (searchId == null || searchId.isEmpty()) {
            questionList = questionRepository.findAll();
        } else {
            questionList = questionRepository.findByTitleContaining(searchId);
        }

        questionList = sortQuestions(questionList, sortInfo, likeService);
        List<QuestionDto.Get> questionsDto = questionList.stream()
                .map(question -> questionMapper.questionToGetQuestion(question, likeService, answerService))
                .collect(Collectors.toList());

        return new ResponseEntity<>(new QuestionsDto<>(questionsDto), HttpStatus.OK);
    }

    private List<Question> sortQuestions(List<Question> questions, String sortInfo, QuestionLikeService likeService) {
        switch (sortInfo.toUpperCase()) {
            case "HOT":
                Map<Question, Integer> likesMap = new HashMap<>();
                for (Question question : questions) {
                    likesMap.put(question, likeService.likes(question));
                }
                return questions.stream()
                        .sorted(Comparator.comparing(likesMap::get).reversed())
                        .collect(Collectors.toList());
            case "NEW":
                return questions.stream()
                        .sorted(Comparator.comparing(Question::getCreatedAt).reversed())
                        .collect(Collectors.toList());
            case "TOP":
                return questions.stream()
                        .sorted(Comparator.comparing(Question::getViews).reversed())
                        .collect(Collectors.toList());
            default:
                throw new IllegalArgumentException("Invalid sortInfo: " + sortInfo);
        }
    }

    // 질문 등록 시, 저장
    public void createQuestion(Question question) {
        questionRepository.save(question);
    }

    // 질문 확인 페이지 조회 - 질문 조회
    public Question findQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new RuntimeException("not found question"));

        // get 으로 질문 조회 시, 조회 수 추가
        questionRepository.incrementViews(questionId);

        // DB에 조회 수 업데이트 후, 해당 질문 리턴
        return questionRepository.findById(questionId).orElseThrow(() -> new RuntimeException("not found question"));

    }

    // 질문 수정
    public void updateQuestion(Question question, String email) {
        Optional<Question> optionalQuestion = questionRepository.findById(question.getQuestionId());
        Question findQuestion = optionalQuestion.orElseThrow(() -> new RuntimeException("not found question"));

        // 질문 수정 때 받은 email 과 등록된 질문 email 비교 하여 같은 경우 제목, 본문 수정, 다를 경우 예외처리
        String findQuestionEmail = findQuestion.getMember().getEmail();
        if (findQuestionEmail.equals(email)) {
            findQuestion.setTitle(question.getTitle());
            findQuestion.setContent(question.getContent());
            // 수정 된 질문 저장
            questionRepository.save(findQuestion);
        } else {
            throw new RuntimeException("403 Forbidden");
        }

    }

    // 질문 삭제
    public void deleteQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new RuntimeException("not found question"));

        // 질문과 연결된 좋아요 삭제
        Iterator like = findQuestion.getLikeList().iterator();
        while (like.hasNext()) {
            Like findLike = (Like) like.next();
            likeRepository.deleteById(findLike.getLike_id());
        }

        // 질문과 연결 된 댓글 삭제 - 댓글 구현 시, 작성 필요

        // 질문에 대한 답변 삭제
        Iterator answer = findQuestion.getAnswerList().iterator();
        while (answer.hasNext()) {
            Answer findAnswer = (Answer) answer.next();
            answerRepository.deleteById(findAnswer.getAnswerId());
        }

        // 질문에 포함된 태그 삭제 - 태그 구현 시, 작성 필요

        // 질문 삭제
        questionRepository.deleteById(questionId);
    }


    public Long getMemberIdByQuestionId(Long questionId) {
        Question question = findQuestion(questionId);
        return question.getMember().getMemberId();
    }

    public void saveLike(Long questionId, Long memberId) {
        Question question = findQuestion(questionId);
        Member member = memberService.findMemberById(memberId);

        Like like = new Like();
        like.setQuestion(question);
        like.setMember(member);

        likeRepository.save(like);
    }

    public void removeLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }

    // 답변 채택 기능
    public void chooseAnswer(Long questionId, Long answerId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new NotFoundException("질문을 찾을 수 없습니다."));

        if (answerId == null) {
            question.setAcceptedAnswerId(null);
        } else {
            boolean isExist = false;
            for (Answer answer : question.getAnswerList()) {
                if (answer.getAnswerId().equals(answerId)) {
                    question.setAcceptedAnswerId(answerId);
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                throw new BadRequestException("존재하지 않는 답변입니다.");
            }
        }
    }

    // 마이페이지 내 질문목록 조회
    public List<Question> findQuestionsByMemberId(long memberId) {
        List<Question> findQuestions = questionRepository.findQuestionsByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("not found questions"));
        return findQuestions;
    }

}
