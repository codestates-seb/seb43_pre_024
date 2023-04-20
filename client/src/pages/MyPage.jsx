import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useFetch from '../util/useFetch';
import profileImg from '../images/profileImg.jpeg';

const MypageBox = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 3% 0 0 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProfileBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 300px;
  display: flex;
  align-items: center;
  padding-left: 100px;
  margin-top: 3%;
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
    width: 80%;
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
  box-sizing: border-box;
  width: 100%;
  padding-left: 6rem;
  height: 50%;
  display: flex;
  flex-direction: column;
  margin-top: 4%;
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
  box-sizing: border-box;
  width: 80%;

  .questionBox {
    border-bottom: 1px solid rgb(176, 171, 171);
    box-sizing: border-box;
    height: 100%;
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
  width: 80%;
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
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 6rem;
  position: absolute;
  bottom: -9%;
  right: 0;

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

const SecessionAlertBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 140%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 4;
`;

const SecessionAlertBox = styled.div`
  width: 30%;
  height: 20%;
  background-color: white;
  border-radius: 5px;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 100px;

  .alertText {
    font-size: 1.5rem;
    margin-left: 20px;
  }

  .btnBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    width: 100%;
    margin-top: 30px;
  }

  .onBtn,
  .offBtn {
    width: 80px;
    padding: 10px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    margin-left: 10px;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  }

  .onBtn {
    background-color: rgb(77, 139, 221);
    color: white;

    :hover {
      background-color: rgb(60, 110, 174);
    }
  }

  .offBtn {
    background-color: white;
    color: rgb(77, 139, 221);

    :hover {
      background-color: rgb(242, 242, 242);
    }
  }
`;

function MyPage({
  pageData,
  pageAnswersData,
  setQuestionsActive,
  setAnswersActive,
  questionsActive,
  answersActive,
}) {
  const { datas, isPending, error } = useFetch(`
  http://localhost:3001/user`);

  const [user, setUsers] = useState([]);
  const [secession, setSecession] = useState(false);
  const [alert, setAlert] = useState(false);

  function activeQuestions() {
    setQuestionsActive(true);
    setAnswersActive(false);
  }

  function activeAnswers() {
    setQuestionsActive(false);
    setAnswersActive(true);
  }

  function onSecession() {
    setSecession(true);
  }

  function onAlert() {
    setAlert(true);
  }

  function offAlert() {
    setAlert(false);
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
            {pageAnswersData
              ? pageAnswersData.map(answer => {
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
        <button type="button" className="secession" onClick={onAlert}>
          secession
        </button>
      </BtnBox>
      {alert ? (
        <SecessionAlertBack>
          <SecessionAlertBox>
            <span className="alertText">Are you sure you want to leave?</span>
            <div className="btnBox">
              <button className="onBtn" onClick={onAlert} type="button">
                YES
              </button>
              <button className="offBtn" onClick={offAlert} type="button">
                NO
              </button>
            </div>
          </SecessionAlertBox>
        </SecessionAlertBack>
      ) : null}
    </MypageBox>
  );
}

export default MyPage;
