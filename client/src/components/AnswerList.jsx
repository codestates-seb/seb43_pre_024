import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { API_URL } from "../index";
import { fetchAnswerInfo, addLike } from "../api";

const HeartButtonStyle = styled.div`
  display: flex;
  gap: 2;
`;

function AnswerList({ questionId }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchAnswerInfo({ questionId }).then((data) => {
      setAnswers(data);
    });
  }, []);

  function onClickHeartButton({ questionId }) {
    // 로그인한 유저가 이 답변에 좋아요를 눌렀는지 서버에서 알려줘야 좋아요 해제가 가능함
    addLike({ questionId })
      .then(function (response) {
        console.log(response);
        fetchAnswerInfo();
      })
      .catch(function (error) {
        console.log(error);
        alert("좋아요를 누를 수 없습니다.");
      });
  }

  if (!answers) {
    return <div>답변을 조회하지 못했습니다.</div>;
  }

  if (answers.length === 0) {
    return <div>등록된 답변이 없습니다.</div>;
  }

  return (
    <div style={{ width: "80%" }}>
      <div style={{ fontSize: "20px", margin: 0 }}>{answers.length} Answer</div>
      {answers.map((answer) => (
        <div
          style={{
            display: "flex",
            flexDirection: "rows",
            gap: 20,
            marginTop: 30,
            marginBottom: 30,
            paddingBottom: 30,
            borderBottom: "1px solid #eee",
          }}
        >
          <div style={{ margin: "auto" }}>
            <HeartButtonStyle>
              <AiFillHeart
                size="20"
                style={{ color: "red" }}
                onClick={() => onClickHeartButton(answer.AnswerId)}
              />
              {answer.likes}
            </HeartButtonStyle>
            <div>
              <button
                //  로그인 구현이 끝나야 채택하기가 가능함. 로그인이 되어있고, 질문 작성자가 맞으면 채택하기 버튼이 보이도록 구현해야함
                onclick={() => {
                  // TODO: 채택하기 API 연동
                  // if(isLogin && isAuthor) {
                  // }
                  //   axios
                  //     .post(`${API_URL}/questions/${questionId}`, {
                  //       // answerId: answer_id,
                  //     })
                  //     .then(() => {})
                  //     .catch(() => {});
                }}
              >
                채택하기
              </button>
            </div>
          </div>

          <div key={answer.AnswerId} style={{ flex: 1 }}>
            <div style={{ marginBottom: 20 }}>{answer.title}</div>
            <MDEditor.Markdown source={answer.content} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnswerList;
