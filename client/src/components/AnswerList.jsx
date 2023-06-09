import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { addLike, apiClient } from "../api";
import { useNavigate } from "react-router-dom";

const HeartButtonStyle = styled.div`
  display: flex;
  gap: 2;
`;

function AnswerList({ questionDetail, fetchQuestionDetail, questionId }) {
  const navigate = useNavigate();
  function onClickHeartButton({ answerId }) {
    // 로그인한 유저가 이 답변에 좋아요를 눌렀는지 서버에서 알려줘야 좋아요 해제가 가능함
    const token = localStorage.getItem("Authorization");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    addLike({ answerId }, token)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        alert("좋아요를 누를 수 없습니다.");
      });
  }

  if (!questionDetail?.answerList) {
    return <div>답변을 조회하지 못했습니다.</div>;
  }

  if (questionDetail?.answerList.length === 0) {
    return <div>등록된 답변이 없습니다.</div>;
  }

  return (
    <div style={{ width: "80%" }}>
      <div style={{ fontSize: "20px", margin: 0 }}>
        {questionDetail?.answerList?.length} Answer
      </div>
      {questionDetail?.answerList.map((answer) => (
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
                onClick={() => {
                  fetch(
                    `${process.env.REACT_APP_FRONT}/questions/${questionId}/answer/{answer_id}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                    .then((response) => {
                      navigate("/");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                ⛔️삭제하기
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
