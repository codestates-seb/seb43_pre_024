import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const HeartButtonStyle = styled.div`
  display: flex;
  gap: 2;
`;

function AnswerList({ questionId }) {
  // TODO: Api 호출해서 데이터 받아오기
  const data = [
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
  ];

  const [answerCount, setAnswerCount] = useState(data.length);

  const onClickHeartButton = () => {
    // TODO: 좋아요 API 연동
  };

  return (
    <div style={{ width: "80%" }}>
      <div style={{ fontSize: "20px", margin: 0 }}>{answerCount} Answer</div>
      {data.map((answer) => (
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
