import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { API_URL } from "../index";

const HeartButtonStyle = styled.div`
  display: flex;
  gap: 2;
`;

function AnswerList({ questionId }) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/questions/${questionId}`)
      .then(function (response) {
        // 성공 핸들링
        console.log(response);
        setAnswers(response.data.answers);
        console.log(response.data);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
        setAnswers([
          {
            AnswerId: 14,
            title: "답변입니다",
            content:
              "```javascript\n const a = 235242; const b = 7654345\n console.log(a);\nconsole.log(b)\n```",
            name: "김미리",
            likes: "140",
            answer_cnt: "8",
            views: "64",
            created_at: "2023-04-18 18:52",
            accepted_answer: true,
          },
          {
            AnswerId: 14,
            title: "저도 답변 하나 추가요",
            content:
              "good~~  hihi~~\n ```javascript\n const a = 123124; \nconst b = 43252314\n console.log(a);\nconsole.log(b)\n```",
            name: "오다경",
            likes: "183",
            answer_cnt: "8",
            views: "74",
            created_at: "2023-04-18 18:52",
            accepted_answer: true,
          },
        ]);
      });
  }, []);

  const onClickHeartButton = () => {
    // TODO: 좋아요 API 연동
  };

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
                onClick={() => onClickHeartButton()}
              />
              {answer.likes}
            </HeartButtonStyle>
            <div>
              <button
                onclick={() => {
                  // TODO: 채택하기 API 연동
                  // if(isLogin && isAuthor) {
                  // }
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
