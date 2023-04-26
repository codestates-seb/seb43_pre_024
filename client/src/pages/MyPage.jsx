import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import profileImg from "../images/profileImg.jpeg";
import {FaRegSadCry} from 'react-icons/fa';

const MypageBox = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 2rem;
  padding-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProfileBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 230px;
  display: flex;
  align-items: center;
  padding-left: 100px;
  margin-top: 3%;
`;

const ProfileImg = styled.div`
  width: 300px;
  height: 300px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 3rem;

  .profileImg {
    width: 230px;
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
    display: flex;
    align-items: center;
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

const CorrectionBtn = styled.button`
  border: none;
  background-color: rgb(107, 147, 249);
  padding: 10px;
  border-radius: 5px;
  margin-left: 20px;
  color: white;

  :hover {
    background-color: rgb(90, 124, 210);
  }
`;

const CorrectionBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 175%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 4;
`;

const CorrectionBox = styled.div`
  width: 500px;
  height: 400px;
  background-color: white;
  border-radius: 5px;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 600px;

  .correctionText {
    margin-bottom: 0;
  }

  .correctionBtnBox {
    margin-top: 30px;
    width: 100%;
    text-align: right;

    .correctionOnBtn,
    .correctionOffBtn {
      width: 80px;
      padding: 10px;
      font-size: 1.2rem;
      border: none;
      border-radius: 5px;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }

    .correctionOnBtn {
      background-color: rgb(77, 139, 221);
      color: white;

      :hover {
        background-color: rgb(60, 110, 174);
      }
    }

    .correctionOffBtn {
      background-color: white;
      color: rgb(77, 139, 221);
      margin-left: 20px;

      :hover {
        background-color: rgb(242, 242, 242);
      }
    }
  }
`;

const CorrectionFormBox = styled.div`
  width: 100%;
  height: 80%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;

  .infoBox {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 2rem;
    position: relative;
    margin-top: 20px;
  }

  .nameBox {
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    .name {
      display: block;
      margin-right: 10px;
      width: 150px;
      color: rgb(82, 82, 82);
    }

    .nameInput {
      height: 25px;
      border: none;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      font-size: 1.1rem;
      border-radius: 5px;
      padding: 5px;

      :focus {
        outline: none;
      }
    }
  }

  .passwordBox {
    display: flex;
    align-items: center;

    .password {
      margin-right: 10px;
      display: block;
      width: 150px;
      color: rgb(82, 82, 82);
    }

    .passwordInput {
      height: 25px;
      border: none;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      font-size: 1.1rem;
      border-radius: 5px;
      padding: 5px;
      font-size: 1.1rem;

      :focus {
        outline: none;
      }
    }
  }

  .rePasswordBox {
    display: flex;
    align-items: center;

    .rePassword {
      margin-right: 10px;
      display: block;
      width: 150px;
      color: rgb(82, 82, 82);
    }

    .rePasswordInput {
      height: 25px;
      border: none;
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
      font-size: 1.1rem;
      border-radius: 5px;
      padding: 5px;
      font-size: 1.1rem;

      :focus {
        outline: none;
      }
    }
  }

  .lengthNotConfirm {
    font-size: 0.8rem;
    margin-bottom: 15px;
    color: rgb(220, 85, 85);
    margin-right: 70px;
    margin-top: 5px;
    text-align: right;
  }

  .lengthConfirm {
    font-size: 0.8rem;
    margin-bottom: 15px;
    color: rgb(107, 147, 249);
    margin-right: 70px;
    margin-top: 5px;
    text-align: right;
  }

  .confirmAlert {
    font-size: 0.8rem;
    text-align: right;
    margin-right: 70px;
    margin-top: 5px;
  }

  .verified {
    color: rgb(107, 147, 249);
  }

  .unverified {
    color: rgb(220, 85, 85);
  }
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-left: 6rem;
  height: 50%;
  display: flex;
  flex-direction: column;
  margin-top: 8%;

  .noData {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
  }
`;

const TabBox = styled.div`
  box-sizing: border-box;
  margin-left: 20px;
`;

const QuestionsBtn = styled.button`
  border: none;
  background-color: ${(props) =>
    props.questionsActive === true
      ? "rgb(107, 147, 249)"
      : "rgb(168, 198, 232)"};
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
  background-color: ${(props) =>
    props.answersActive === true ? "rgb(107, 147, 249)" : "rgb(168, 198, 232)"};
  color: white;
  padding: 1rem;
  width: 140px;
  font-size: 1.3rem;
  border-top-left-radius: 5px;
  cursor: pointer;
  border-top-right-radius: 5px;
`;

const QuestionsBox = styled.div`
  border: 1px solid rgb(176, 171, 171);
  border-radius: 5px;
  box-sizing: border-box;
  width: 80%;
  height: 300px;

  .questionBox {
    border-bottom: 0.5px solid rgb(176, 171, 171);
    box-sizing: border-box;
    height: 50%;
    padding: 1rem;

    .title {
      font-size: 1.4rem;
      color: rgb(57, 116, 194);
      margin-top: 10px;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      line-height: 1.2;
      text-align: left;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

      :hover {
        color: rgb(77, 139, 221);
      }
    }

    .tagsBox {
      display: flex;
      flex-direction: row;
      width: 50%;

      .tag {
        background-color: rgb(227, 235, 243);
        padding: 8px;
        font-size: 1.1rem;
        border-radius: 5px;
        color: rgb(80, 114, 154);
        margin-right: 10px;

        :hover {
          background-color: rgb(213, 226, 240);
          color: rgb(66, 96, 129);
        }
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
    margin-top: 40px;
    color: rgb(61, 66, 70);
  }
`;

const AnswersBox = styled.div`
  border: 1px solid rgb(176, 171, 171);
  border-radius: 5px;
  height: 300px;
  width: 80%;
  box-sizing: border-box;

  .questionBox {
    border-bottom: 0.5px solid rgb(176, 171, 171);
    box-sizing: border-box;
    height: 50%;
    padding: 1rem;

    .title {
      font-size: 1.4rem;
      color: rgb(57, 116, 194);
      margin-top: 10px;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      line-height: 1.2;
      text-align: left;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

      :hover {
        color: rgb(77, 139, 221);
      }
    }

    .tagsBox {
      display: flex;
      flex-direction: row;
      width: 50%;

      .tag {
        background-color: rgb(227, 235, 243);
        padding: 8px;
        font-size: 1.1rem;
        border-radius: 5px;
        color: rgb(80, 114, 154);
        margin-right: 10px;

        :hover {
          background-color: rgb(213, 226, 240);
          color: rgb(66, 96, 129);
        }
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
    margin-top: 40px;
    color: rgb(61, 66, 70);
  }
`;

const BtnBox = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 7rem;
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
  height: 175%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 4;
`;

const SecessionAlertBox = styled.div`
  width: 600px;
  height: 250px;
  background-color: white;
  border-radius: 5px;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 350px;

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
  const [userName, setUsersName] = useState("");
  const [email, setEmail] = useState("");
  const [secession, setSecession] = useState(false);
  const [secessionAlert, setSecessionAlert] = useState(false);
  const [correction, setCorrection] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("g");
  const [lengthConfirm, setLengthConfirm] = useState(false);
  const [rePassword, setRePassword] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const URL = process.env.REACT_APP_FRONT;
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    fetch(`${URL}/users/${memberId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(true);
        setQuestions(data.questions);
        setUsersName(data.name);
        setEmail(data.email);
      })
      .catch((err) => {
        setIsPending(false);
        console.log(err);
      });
  }, [isPending]);

  function deleteUser() {
    fetch(`${URL}/users/${memberId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        setSecessionAlert(false);
        localStorage.removeItem("Authorization");
        localStorage.removeItem("member-id");
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
    deleteUser();
  }

  function onAlert() {
    setSecessionAlert(true);
  }

  function offAlert() {
    setSecessionAlert(false);
  }

  function onCorrection() {
    setCorrection(true);
  }

  function offCorrection() {
    setCorrection(false);
  }

  function changeName(e) {
    setName(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function changeRePassword(e) {
    setRePassword(e.target.value);
  }

  function toNavigate(id) {
    navigate(`/questions/${id}`);
  }

  useEffect(() => {
    if (password.length > 6 && password.length < 20) {
      setLengthConfirm(true);
    } else if (password.length < 6) {
      setLengthConfirm(false);
    } else if (password.length > 20) {
      setLengthConfirm(false);
    }
  }, [password]);

  useEffect(() => {
    if (
      password === rePassword &&
      password.length !== 0 &&
      rePassword.length !== 0
    ) {
      setConfirm(true);
    } else if (
      password !== rePassword ||
      password.length === 0 ||
      rePassword.length === 0
    ) {
      setConfirm(false);
    }
  }, [rePassword, password, confirm]);

  const memberId = localStorage.getItem("member-id");

  const onChangePut = () => {
    if (!confirm) {
      alert("비밀번호를 확인해주세요!");
    } else {
      fetch(`${URL}/users/${memberId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, password, email }),
      })
        .then(() => {
          console.log(userName);
          offCorrection();
        })
        .catch((err) => console.log(err));
    }
    window.location.reload();
  };

  return (
    <MypageBox>
      <ProfileBox>
        <ProfileImg>
          <img src={profileImg} alt="propfileImg" className="profileImg" />
        </ProfileImg>
        <ProfileDetail>
          <div className="nameBox">
            {userName}
            <CorrectionBtn onClick={() => onCorrection()}>
              Correction
            </CorrectionBtn>
          </div>
          <div className="countBox">
            <span className="countQuestions">
              <b>{questions ? questions.length : null}</b>&nbsp;questions&nbsp;
            </span>
            <span className="countQuestions">
              <b>{answers ? answers.length : 0}</b>&nbsp;answers
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
            {pageData ?
              pageData.map((question) => {
                return (
                  <div key={question.questionId} className="questionBox">
                    <div className="detailBox">
                      <span className="likes">{question.likes} likes</span>
                      <span className="answerCnt">
                        {question.answer_cnt} answers
                      </span>
                      <span className="views">{question.views} views</span>
                    </div>
                    <div className="title" onClick={() => toNavigate(question.questionId)}>{question.title}</div>
                    <div className="createdAt">
                      asked &nbsp;{question.created_at}
                    </div>
                  </div>
                );
              }) : <div className="noData">No Questions...<FaRegSadCry /></div>}
          </QuestionsBox>
        ) : null}
        {answersActive ? (
          <AnswersBox>
            {pageAnswersData ?
              pageAnswersData.map((answer) => {
                return (
                  <div key={answer.questionId} className="questionBox">
                    <div className="detailBox">
                      <span className="likes">{answer.likes} likes</span>
                      <span className="answerCnt">
                        {answer.answer_cnt} answers
                      </span>
                      <span className="views">{answer.views} views</span>
                    </div>
                    <div className="title" onClick={() => toNavigate(answer.questionId)}>{answer.title}</div>
                    <div className="createdAt">
                      asked &nbsp;{answer.created_at}
                    </div>
                  </div>
                );
              }) : <div className="noData">No Answers...<FaRegSadCry /></div>}
          </AnswersBox>
        ) : null}
      </ContentBox>
      <BtnBox>
        <button type="button" className="secession" onClick={onAlert}>
          secession
        </button>
      </BtnBox>
      {secessionAlert ? (
        <SecessionAlertBack>
          <SecessionAlertBox>
            <span className="alertText">Are you sure you want to leave?</span>
            <div className="btnBox">
              <button
                className="onBtn"
                onClick={() => deleteUser()}
                type="button"
              >
                YES
              </button>
              <button className="offBtn" onClick={offAlert} type="button">
                NO
              </button>
            </div>
          </SecessionAlertBox>
        </SecessionAlertBack>
      ) : null}
      {correction ? (
        <CorrectionBack>
          <CorrectionBox>
            <h2 className="correctionText">User Information</h2>
            <CorrectionFormBox name="userInfo" method="post" action="/">
              <div className="infoBox">
                <div className="nameBox">
                  <span className="name">name</span>
                  <input
                    className="nameInput"
                    type="text"
                    name="name"
                    defaultValue={userName}
                    onChange={(e) => changeName(e)}
                  />
                </div>
                <div className="passwordBox">
                  <span className="password">password</span>
                  <input
                    className="passwordInput"
                    type="password"
                    name="password"
                    onChange={(e) => changePassword(e)}
                  />
                </div>
                {lengthConfirm ? (
                  <div className="lengthConfirm">verified</div>
                ) : (
                  <div className="lengthNotConfirm">
                    Write more than 7 characters and less than 20 characters.
                  </div>
                )}
                <div className="rePasswordBox">
                  <span className="rePassword">confirm password</span>
                  <input
                    className="rePasswordInput"
                    type="password"
                    name="password"
                    onChange={(e) => changeRePassword(e)}
                  />
                </div>
                {confirm ? (
                  <div className="confirmAlert verified">verified</div>
                ) : (
                  <div className="confirmAlert unverified">unverified</div>
                )}
              </div>
              <div className="correctionBtnBox">
                <button
                  className="correctionOnBtn"
                  onClick={onChangePut}
                  type="button"
                >
                  Submit
                </button>
                <button
                  className="correctionOffBtn"
                  onClick={offCorrection}
                  type="submit"
                >
                  Cancel
                </button>
              </div>
            </CorrectionFormBox>
          </CorrectionBox>
        </CorrectionBack>
      ) : null}
    </MypageBox>
  );
}

export default MyPage;
