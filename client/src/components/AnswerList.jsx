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
        "\n good~~  hihi~~\n ```javascript\n const a = 235242; const b = 7654345\n console.log(a);\nconsole.log(b)\n```",
      name: "김미리",
      likes: "140",
      answer_cnt: "8",
      views: "64",
      created_at: "2023-04-18 18:52",
      accepted_answer: true,
    },
  ];

  const [answerCount, setAnswerCount] = useState(data.length);
  const [count, setCount] = useState(0);

  const onClickHeartButton = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <div style={{ fontSize: "20px", margin: 0 }}>{answerCount} Answer</div>
      {data.map((answer) => (
        <div key={answer.AnswerId}>
          <div>{answer.title}</div>
        </div>
      ))}
      <HeartButtonStyle>
        <AiFillHeart
          size="20"
          style={{ color: "red" }}
          onClick={() => onClickHeartButton()}
        />
        {count}
      </HeartButtonStyle>
      <MDEditor.Markdown source={data[0].content} style={{ width: "80%" }} />
    </div>
  );
}

export default AnswerList;
