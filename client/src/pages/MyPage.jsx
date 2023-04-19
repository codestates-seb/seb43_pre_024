import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useFetch from '../util/useFetch';
import profileImg from '../images/profileImg.jpeg';

const MypageBox = styled.div`
  width: calc(100% - 250px);
  border: 1px solid green;
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
  border: 1px solid black;
  display: flex;
  align-items: center;
  padding-left: 10%;
`;

const ProfileImg = styled.div`
  width: 25%;
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
    z-index: 1;
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
  width: 100%;
  box-sizing: border-box;
  height: 50%;
  border: 1px solid black;
`;

const TabBox = styled.div`
  box-sizing: border-box;
  border: 1px solid black;
`;

const QuestionsBtn = styled.button`
  border: none;
  background-color: rgb(168, 198, 232);
  color: white;
  padding: 1rem;
  font-size: 1.3rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const AnswerssBtn = styled.button`
  border: none;
  background-color: ${props =>
    props.questionsActive === true
      ? 'rgb(107, 147, 149)'
      : 'rgb(168, 198, 232)'};
  color: white;
  padding: 1rem;
  font-size: 1.3rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const QuestionsBox = styled.div`
  border: 1px solid black;
  box-sizing: border-box;
`;

const BtnBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 10%;
  border: 1px solid black;
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

function MyPage() {
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
              <b>{user.questions ? user.questions.length : 0}</b>&nbsp;
              questions&nbsp;
            </span>
            <span className="countQuestions">
              <b>{user.answers ? user.answers.length : 0}</b>&nbsp;answers
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
          <AnswerssBtn
            type="button"
            onClick={() => activeAnswers()}
            answersActive={answersActive}
          >
            Answers
          </AnswerssBtn>
        </TabBox>
        <QuestionsBox>
          <h2>dkfj</h2>
        </QuestionsBox>
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
