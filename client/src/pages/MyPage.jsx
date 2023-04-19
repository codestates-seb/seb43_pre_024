import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useFetch from '../util/useFetch';
import profileImg from '../images/profileImg.jpeg';

const MypageBox = styled.div`
  width: calc(100% - 250px);
  box-sizing: border-box;
  padding: 3rem 5rem 3rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 40%;
  display: flex;
  align-items: center;
  padding-left: 10%;
`;

const ProfileImg = styled.div`
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 3rem;

  .profileImg {
    width: 100%;
    position: absolute;
    z-index: -1;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  }
`;

const ProfileDetail = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  box-sizing: border-box;

  .nameBox {
    font-size: 1.5rem;
    padding-bottom: 1rem;
    margin-bottom: 10px;
    margin-left: 5px;
  }

  .countBox {
    border: 1px solid rgb(222, 222, 222);
    border-radius: 5px;
    padding: 1rem 0.5rem 1rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .countQuestions {
    margin-right: 10px;
    font-size: 1.3rem;
  }
`;

const ContentBox = styled.div`
  width: 90%;
  box-sizing: border-box;
  height: 50%;
  padding: 4rem;
  display: flex;
  flex-direction: column;
`;

const TabBox = styled.div`
  box-sizing: border-box;
  margin-left: 20px;
`;

const QuestionsBtn = styled.button`
  border: none;
  background-color: ${props =>
    props.questionsActive === true
      ? 'rgb(107, 147, 249)'
      : 'rgb(168, 198, 232)'};
  color: white;
  padding: 1rem;
  width: 140px;
  font-size: 1.3rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const AnswersBtn = styled.button`
  border: none;
  background-color: ${props =>
    props.answersActive === true ? 'rgb(107, 147, 249)' : 'rgb(168, 198, 232)'};
  color: white;
  padding: 1rem;
  width: 140px;
  font-size: 1.3rem;
  border-top-left-radius: 5px;
  cursor: pointer;
  border-top-right-radius: 5px;
`;

const QuestionsBox = styled.div`
  border-left: 1px solid rgb(176, 171, 171);
  border-top: 1px solid rgb(176, 171, 171);
  border-right: 1px solid rgb(176, 171, 171);
  border-radius: 5px;
  height: 90%;
  box-sizing: border-box;

  .questionBox {
    border-bottom: 1px solid rgb(176, 171, 171);
    box-sizing: border-box;
    height: 50%;
    padding: 1rem;

    .title {
      font-size: 1.4rem;
      color: rgb(57, 116, 194);
      margin-top: 5px;

      :hover {
        color: rgb(77, 139, 221);
      }
    }
  }

  .detailBox {
    font-size: 1.1rem;
  }

  .likes {
    font-weight: bold;
  }

  .answerCnt {
    margin-left: 12px;
    margin-right: 12px;
    color: rgb(94, 98, 101);
  }

  .views {
    color: rgb(94, 98, 101);
  }

  .createdAt {
    text-align: right;
    margin-top: 30px;
    color: rgb(61, 66, 70);
  }
`;

const AnswersBox = styled.div`
  border-left: 1px solid rgb(176, 171, 171);
  border-top: 1px solid rgb(176, 171, 171);
  border-right: 1px solid rgb(176, 171, 171);
  border-radius: 5px;
  height: 90%;
  box-sizing: border-box;

  .questionBox {
    border-bottom: 1px solid rgb(176, 171, 171);
    box-sizing: border-box;
    height: 50%;
    padding: 1rem;

    .title {
      font-size: 1.4rem;
      color: rgb(57, 116, 194);
      margin-top: 5px;

      :hover {
        color: rgb(77, 139, 221);
      }
    }
  }

  .detailBox {
    font-size: 1.1rem;
  }

  .likes {
    font-weight: bold;
  }

  .answerCnt {
    margin-left: 12px;
    margin-right: 12px;
    color: rgb(94, 98, 101);
  }

  .views {
    color: rgb(94, 98, 101);
  }

  .createdAt {
    text-align: right;
    margin-top: 30px;
    color: rgb(61, 66, 70);
  }
`;

const BtnBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 1rem;

  .secession {
    border: none;
    background-color: rgb(220, 85, 85);
    padding: 10px;
    color: white;
    border-radius: 5px;

    :hover {
      background-color: rgb(169, 63, 63);
    }
  }
`;

function MyPage({ pageData }) {
  const { datas, isPending, error } = useFetch(`
  http://localhost:3001/user`);

  const [user, setUsers] = useState([]);
  const [questionsActive, setQuestionsActive] = useState(true);
  const [answersActive, setAnswersActive] = useState(false);

  function activeQuestions() {
    setQuestionsActive(true);
    setAnswersActive(false);
  }

  function activeAnswers() {
    setQuestionsActive(false);
    setAnswersActive(true);
  }

  useEffect(() => {
    if (isPending) {
      setUsers(datas[0]);
    }
  }, [datas, isPending, user]);

  return (
    <MypageBox>
      <ProfileBox>
        <ProfileImg>
          <img src={profileImg} alt="propfileImg" className="profileImg" />
        </ProfileImg>
        <ProfileDetail>
          <div className="nameBox">{user.name}</div>
          <div className="countBox">
            <span className="countQuestions">
              <b>{pageData ? pageData.length : null}</b>&nbsp;questions&nbsp;
            </span>
            <span className="countQuestions">
              <b>{pageData ? pageData.length : null}</b>&nbsp;answers
            </span>
          </div>
        </ProfileDetail>
      </ProfileBox>
      <ContentBox>
        <TabBox>
          <QuestionsBtn
            type="button"
            onClick={() => activeQuestions()}
            questionsActive={questionsActive}
          >
            Questions
          </QuestionsBtn>
          <AnswersBtn
            type="button"
            onClick={() => activeAnswers()}
            answersActive={answersActive}
          >
            Answers
          </AnswersBtn>
        </TabBox>
        {questionsActive ? (
          <QuestionsBox>
            {pageData
              ? pageData.map(question => {
                  return (
                    <div key={question.questionId} className="questionBox">
                      <div className="detailBox">
                        <span className="likes">{question.likes} likes</span>
                        <span className="answerCnt">
                          {question.answer_cnt} answers
                        </span>
                        <span className="views">{question.views} views</span>
                      </div>
                      <div className="title">{question.title}</div>
                      <div className="createdAt">
                        asked &nbsp;{question.created_at}
                      </div>
                    </div>
                  );
                })
              : null}
          </QuestionsBox>
        ) : null}
        {answersActive ? (
          <AnswersBox>
            {pageData
              ? pageData.map(answer => {
                  return (
                    <div key={answer.questionId} className="questionBox">
                      <div className="detailBox">
                        <span className="likes">{answer.likes} likes</span>
                        <span className="answerCnt">
                          {answer.answer_cnt} answers
                        </span>
                        <span className="views">{answer.views} views</span>
                      </div>
                      <div className="title">{answer.title}</div>
                      <div className="createdAt">
                        asked &nbsp;{answer.created_at}
                      </div>
                    </div>
                  );
                })
              : null}
          </AnswersBox>
        ) : null}
      </ContentBox>
      <BtnBox>
        <button type="button" className="secession">
          secession
        </button>
      </BtnBox>
    </MypageBox>
  );
}

export default MyPage;
